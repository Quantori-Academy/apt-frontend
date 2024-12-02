import { Box } from "@mui/material";
import { useEffect } from "react";
// @ts-expect-error: No type declarations for 'smiles-drawer'
import SmilesDrawer from "smiles-drawer";

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

const borderStyles = {
  border: "1px solid teal",
  borderRadius: " 10px",
  background: "white",
};

const SmilesImage: React.FC<SmilesImageProps> = ({
  index,
  smiles,
  withBorder,
  align = "center",
  svgOptions,
}) => {
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
        style={{
          display: "block",
          ...(withBorder && borderStyles),
        }}
        {...svgOptions}
        id={`${smiles}-${index}`}
      ></svg>
    </Box>
  );
};

export default SmilesImage;
