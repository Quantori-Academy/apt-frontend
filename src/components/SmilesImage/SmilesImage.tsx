import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
// @ts-expect-error: No type declarations for 'smiles-drawer'
import SmilesDrawer from "smiles-drawer";

import styles from "./SmilesImage.module.css";

type SmilesImageProps = {
  smiles: string;
};
const options = {
  width: 185,
  height: 185,
};
const SmilesImage: React.FC<SmilesImageProps> = ({ smiles }) => {
  const drawer = new SmilesDrawer.SvgDrawer(options);

  useEffect(() => {
    SmilesDrawer.parse(smiles, function (tree: unknown) {
      drawer.draw(tree, "structure-svg", "light");
    });
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Structure(smiles)
      </Typography>
      <svg className={styles.smilesSvg} {...options} id="structure-svg"></svg>
    </Box>
  );
};

export default SmilesImage;
