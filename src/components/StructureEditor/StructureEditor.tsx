import { Ketcher, RemoteStructServiceProvider } from "ketcher-core";
import { Editor } from "ketcher-react";

import "ketcher-react/dist/index.css";

type KetcherEditorProps = {
  onChange: (smiles: string) => void;
};

const StructureEditor: React.FC<KetcherEditorProps> = ({ onChange }) => {
  const structServiceProvider = new RemoteStructServiceProvider(
    process.env.REACT_APP_API_PATH!
  );

  const handleInit = (ketcher: Ketcher) => {
    ketcher.editor.event.change.add(async () => {
      const smiles = await ketcher.getSmiles();
      onChange(smiles);
    });
  };

  return (
    <Editor
      staticResourcesUrl="process.env.PUBLIC_URL"
      structServiceProvider={structServiceProvider}
      errorHandler={console.error}
      onInit={handleInit}
    />
  );
};

export default StructureEditor;
