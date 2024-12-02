import { useTranslation } from "react-i18next";

import { PageError, PageLoader, SubstancesList } from "@/components";
import { useGetSubstancesQuery } from "@/store";

const Substances: React.FC = () => {
  const { t } = useTranslation();
  const { data: substances = [], isLoading, isError } = useGetSubstancesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageError text={t("substances.errors.loadError")} />;
  }

  return <SubstancesList substances={substances} isInLocation={false} />;
};

export default Substances;
