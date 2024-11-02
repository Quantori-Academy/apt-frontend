import { Box } from "@mui/material";
import { useEffect } from "react";
// @ts-expect-error: No type declarations for 'smiles-drawer'
import SmilesDrawer from "smiles-drawer";

import styles from "./SmilesImage.module.css";

type SmilesImageProps = {
  smiles: string;
  svgOptions: {
    width: number;
    height: number;
  };
};

const SmilesImage: React.FC<SmilesImageProps> = ({ smiles, svgOptions }) => {
  useEffect(() => {
    const drawer = new SmilesDrawer.SvgDrawer(svgOptions);
    SmilesDrawer.parse(smiles, function (tree: unknown) {
      drawer.draw(tree, "structure-svg", "light");
    });
  }, [smiles]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <svg
        className={styles.smilesSvg}
        {...svgOptions}
        id="structure-svg"
      ></svg>
    </Box>
  );
};

export default SmilesImage;
