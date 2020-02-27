import React, { Component } from "react";
import ReactDOM from "react-dom";
import marked from "marked";

marked.setOptions({
  breaks: true
});
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: `# Markdown Previewer

## This is a sub-header!

Heres some \`code\`:<br><br>

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
<br>

- And of course there are **lists**.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
> This is a blockquote and this above is an image!
<br>
This was made using [Marked.js](https://marked.js.org).
`
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    console.log({
      __html: marked(this.state.input, { renderer: renderer })
    });
    return (
      <div id="wrapper">
        <Editor changeHandlerFun={this.handleChange} text={this.state.input} />
        <Preview text={this.state.input} />
      </div>
    );
  }
}
class Editor extends Component {
  render() {
    return (
      <textarea
        id="editor"
        value={this.props.text}
        onChange={this.props.changeHandlerFun}
      ></textarea>
    );
  }
}

class Preview extends Component {
  render() {
    return (
      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(this.props.text, { renderer: renderer })
        }}
      ></div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));
