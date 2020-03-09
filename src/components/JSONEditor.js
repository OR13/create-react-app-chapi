import React, { Component } from "react";

import PropTypes from "prop-types";

// eslint-disable-next-line
import brace from "brace";
import AceEditor from "react-ace";

// eslint-disable-next-line
import "brace/mode/json";
// eslint-disable-next-line
import "brace/theme/github";

class JSONEditor extends Component {

    render() {
        const { jsonObject, onChange } = this.props;
        const editorValue = jsonObject ? JSON.stringify(jsonObject, null, 2) : ''
        return (
            <AceEditor
                mode="json"
                theme="github"
                readOnly={onChange === undefined}
                style={{ ...this.props.style, width: "100%" }}
                onChange={(data) => {
                    onChange(data);
                }}
                name="JSONEditorEditor"
                value={editorValue}
                editorProps={{ $blockScrolling: true }}
            />
        );
    }
}

JSONEditor.propTypes = {
    jsonObject: PropTypes.object.isRequired,
    style: PropTypes.object
};

export default JSONEditor;
