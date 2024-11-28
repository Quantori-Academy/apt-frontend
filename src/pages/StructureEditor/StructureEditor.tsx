import { Ketcher } from "ketcher-core";
import { Editor } from "ketcher-react";
// @ts-expect-error -- types of ketcher-standalone are outdated
import { StandaloneStructServiceProvider } from "ketcher-standalone";

import "ketcher-react/dist/index.css";

const structServiceProvider = new StandaloneStructServiceProvider();

type KetcherEditorProps = {
  onChange: (smiles: string) => void;
};

const StructureEditor: React.FC<KetcherEditorProps> = ({ onChange }) => {
  const handleInit = (ketcher: Ketcher) => {
    ketcher.editor.event.change.add(async () => {
      const smiles = await ketcher.getSmiles();
      onChange(smiles);
    });
  };

  return (
    <Editor
      staticResourcesUrl="./"
      structServiceProvider={structServiceProvider}
      errorHandler={console.error}
      onInit={handleInit}
    />
  );
};

export default StructureEditor;
