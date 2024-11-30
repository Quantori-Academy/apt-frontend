import { Box } from "@mui/material";
import { useEffect } from "react";
// @ts-expect-error: No type declarations for 'smiles-drawer'
import SmilesDrawer from "smiles-drawer";

import styles from "./SmilesImage.module.css";

type SmilesImageProps = {
  smiles: string;
  align?: string;
  index?: number;
  withBorder?: boolean;
  svgOptions: {
    width: number;
    height: number;
  };
};

const SmilesImage: React.FC<SmilesImageProps> = ({
  index,
  smiles,
  withBorder,
  align = "center",
  svgOptions,
}) => {
  const borderStyles = withBorder
    ? {
        border: "1px solid teal",
        borderRadius: " 10px",
        background: "white",
      }
    : {};

  useEffect(() => {
    const drawer = new SmilesDrawer.SvgDrawer(svgOptions);
    SmilesDrawer.parse(smiles, function (tree: unknown) {
      drawer.draw(tree, `${smiles}-${index}`, "light");
    });
  }, [smiles, svgOptions, index]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
      }}
    >
      <svg
        className={styles.smilesSvg}
        style={borderStyles}
        {...svgOptions}
        id={`${smiles}-${index}`}
      ></svg>
    </Box>
  );
};

export default SmilesImage;
