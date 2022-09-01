import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import ReturnPL from "../components/ReturnPL";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ReturnPL">
                <ReturnPL/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;