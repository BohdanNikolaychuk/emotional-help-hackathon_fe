import * as React from "react";

import Button from "@mui/material/Button";

import {Link} from "react-router-dom";

function ContainedButton({content, link}) {
    return (
        <Button
            style={{
                textTransform: 'none',
                color: "#ffffff",
                padding: '.2em 3em',
                background: '#03ACF2',
                borderRadius: "1em"
            }}
            variant="contained"
            sx={{ p: 0, fontSize: { sm: 14, md: 16}}}
            component={Link}
            to={link}
        >
            {content}
        </Button>
    );
}

export default ContainedButton;
