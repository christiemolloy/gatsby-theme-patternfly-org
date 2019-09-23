import React from 'react';
import { graphql } from 'gatsby';
import Handlebars from 'handlebars';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { PageSection, Title } from '@patternfly/react-core';
import SideNavLayout from '../layouts/sideNavLayout';
import AutoLinkHeader from '../components/autoLinkHeader';
import Example from '../components/example';
import CSSVariables from '../components/cssVariables';
import './mdx.css';

const components = {
  pre: React.Fragment,
};
for (let i = 1; i <= 6; i++) {
  components[`h${i}`] = props => <AutoLinkHeader size={`h${i}`} {...props} />;
}

export default ({ data, location, pageContext }) => {
  const { title, cssPrefix } = data.mdx.frontmatter;
  const sourceName = data.mdx.fields.source === 'core'
    ? 'HTML'
    : 'React';
  const handlebarsInstance = Handlebars.create();
  data.partials.nodes.forEach(({ fields }) =>
    handlebarsInstance.registerPartial(fields.name, fields.partial));
  
  return (
    <SideNavLayout location={location} topNavItems={pageContext.topNavItems}>
      <PageSection className="ws-section-main">
        <MDXProvider components={{
          code: props => <Example handlebars={handlebarsInstance} location={location} {...props} />,
          ...components
        }}>
          <Title size="md" className="ws-framework-title">{sourceName}</Title>
          <Title size="4xl">{title}</Title>
          <a href="#examples" className="ws-toc">
            Examples
          </a>
          <a href="#documentation" className="ws-toc">
            Documentation
          </a>
          {cssPrefix && (
            <a href="#css-variables" className="ws-toc">
              CSS Variables
            </a>
          )}
          <AutoLinkHeader size="h1" id="examples">Examples</AutoLinkHeader>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
          {cssPrefix && (
            <React.Fragment>
              <AutoLinkHeader size="h1" id="css-variables">CSS Variables</AutoLinkHeader>
              <CSSVariables prefix={cssPrefix} />
            </React.Fragment>
          )}
        </MDXProvider>
      </PageSection>
    </SideNavLayout>
  );
}

export const pageQuery = graphql`
  query($id: String!, $parentFolder: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        cssPrefix
      }
      fields {
        source
      }
    }
    partials: allFile(filter: { fields: { parentFolder: { eq: $parentFolder } } }) {
      nodes {
        fields {
          name
          partial
        }
      }
    }
  }
`;
