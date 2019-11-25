import React from 'react';
import { Button, Form, TextContent, Text } from '@patternfly/react-core';
import { CopyIcon, AsleepIcon, ExternalLinkAltIcon, CodepenIcon } from '@patternfly/react-icons';
import { copy } from '../helpers/copy';
import './exampleToolbar.css';

export default class ExampleToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.toCopy = props.code;
  }

  state = {
    codeOpen: false,
    openLang: null,
    showCopyMessage: false,
  };

  onCopy = () => {
    copy(this.props.code);

    this.setState({
      showCopyMessage: true
    });
    setTimeout(() => {
      this.setState({
        showCopyMessage: false
      });
    }, 2000);
  };

  onLanguageChange = lang => {
    this.setState({
      codeOpen: this.state.codeOpen && this.state.openLang === lang ? false : true,
      openLang: lang
    });

    if (this.props.onLanguageChange) {
      this.props.onLanguageChange(lang);
    }
  }

  render() {
    const { editor, fullscreenLink, codeBoxParams, supportedLangs, onDarkmodeChange, isFullscreen, hideDarkMode } = this.props;
    const { codeOpen, showCopyMessage } = this.state;
    return (
      <React.Fragment>
        <div>
          {supportedLangs.map(lang => 
            <Button
              key={lang}
              onClick={() => this.onLanguageChange(lang)}
              variant="plain"
              title={`Toggle ${lang} code`}
              aria-label={`Toggle ${lang} code`}
            >
              {lang === 'hbs'
                ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  preserve-aspect-ratio="xMidYMid meet"
                  style={{ verticalAlign: 'middle' }}
                  width="2.5em"
                  height="1em" 
                  viewBox="0 0 512 124">
                  <path
                    d="M188.432 0c17.799-.077 36.052 5.03 49.886 16.537c7.089 5.738 12.815 12.937 17.678 20.602c8.75-14.144 21.531-26.162 37.292-31.955c19.206-7.21 40.915-6.712 60.088.355c16.747 6.114 31.39 16.769 44.67 28.487c10.389 9.171 20.003 19.206 30.702 28.034c5.638 4.574 11.696 8.86 18.63 11.23c9.215 3.146 20.114.178 26.704-6.922c6.103-6.645 5.726-18.131-.997-24.2c-4.275-3.689-11.585-2.947-14.61 1.97c-2.646 3.9-1.162 8.762.91 12.539c-5.506-4.02-11.021-9.625-11-16.935c-1.14-8.451 5.129-15.906 12.638-18.863c14.654-5.86 33.029-.808 42.278 12.095c8.894 12.04 9.602 27.867 8.052 42.21c-1.872 13.624-9.492 26.34-20.79 34.226c-15.86 11.32-35.964 14.83-55.092 14.587c-18.386-.499-36.584-4.652-53.619-11.52c-28.487-11.452-55.147-27.28-84.565-36.428c-9.758-3.788-20.136-5.837-30.57-6.469c-8.307-.055-16.182-.443-24.024.089c-9.57.92-19.084 2.88-28.044 6.39c-29.916 9.305-56.975 25.531-86.005 37.006c-24.512 9.536-51.67 13.967-77.687 8.672c-14.554-2.946-29.042-9.381-38.866-20.845C3.684 91.145-.347 78.098.05 65.316c-.465-12.062 2.182-24.877 10.157-34.27c7.42-8.904 19.372-13.423 30.847-12.426c7.387.343 14.875 3.566 19.438 9.514c3.589 4.707 3.81 11.154 2.237 16.658c-1.916 4.951-5.87 8.817-10.167 11.785c2.193-3.7 3.522-8.584.93-12.45c-3.19-5.15-11.043-5.67-15.196-1.44c-5.117 5.262-6.192 13.857-2.758 20.303c3.721 6.757 11.42 10.611 18.873 11.397c11.276.975 21.056-6.014 29.33-12.792c17.123-14.743 32.54-31.611 51.536-44.083c15.662-10.5 34.114-17.6 53.154-17.511z"
                    fill="#423426"/>
                </svg>
                : lang.toUpperCase()}
            </Button>
          )}
          <Button
            onClick={this.onCopy}
            variant="plain"
            aria-label="Copy code"
          >
            <CopyIcon />
          </Button>
          {!isFullscreen && !hideDarkMode &&
            <Button
              onClick={onDarkmodeChange}
              variant="plain"
              aria-label="Toggle Dark Theme"
            >
              <AsleepIcon />
            </Button>
          }
          {codeBoxParams &&
            <Form
              aria-label="Open in CodeSandbox"
              action="https://codesandbox.io/api/v1/sandboxes/define"
              method="POST"
              target="_blank"
              style={{display: "inline-block"}}
            >
              <Button
                aria-label="Open in CodeSandbox"
                variant="plain"
                type="submit"
              >
                <input type="hidden" name="parameters" value={codeBoxParams} />
                <CodepenIcon />
              </Button>
            </Form>
          }
          {fullscreenLink &&
            <Button
              component="a"
              href={fullscreenLink} 
              target="_blank"
              rel="noopener noreferrer"
              variant="plain"
              aria-label="Open in new window"
            >
              <ExternalLinkAltIcon />
            </Button>
          }
          {showCopyMessage &&
            <TextContent>
              <Text component="pre" className="ws-org-messageText">
                Copied to clipboard
              </Text>
            </TextContent>
          }
        </div>
        {codeOpen && editor}
      </React.Fragment>
    );
  }
}
