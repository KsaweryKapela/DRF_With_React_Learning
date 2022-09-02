import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import RenderToDos from "../components/RenderToDos";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/RenderToDos">
                <RenderToDos/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;