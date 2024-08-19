'use client'

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";

const CustomButtons = ({loading,children,...props}:{ loading:boolean,children:ReactNode}) => {
    return (
        <Button {...props}>
            <LoaderCircleIcon />
            {children}
        </Button>
    );
}

export default CustomButtons;