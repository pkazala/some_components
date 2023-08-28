import Button from "@mui/material/Button"
import React from "react"
import { useTranslation } from "react-i18next"

export const InternshipApplyButton = (props) => {
  const { applyLink } = props
  const { t } = useTranslation("translation")

  return (
    <Button
      variant="contained"
      href={applyLink}
      target="_blank"
      rel="noopener"
      {...props}
    >
      {t("work20.internship.apply")}
    </Button>
  )
}
