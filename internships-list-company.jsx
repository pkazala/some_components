import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import makeStyles from "@mui/styles/makeStyles"
import React, { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Work20Context } from "../../api/api"
import { center } from "../../theme"
import { mergeStartUpsInternships } from "../../utils/work20-helper"
import { PopUp } from "../pop-up/pop-up"
import { InternshipsList } from "./internships-list"
import { Work20Popup } from "./work20-pop-up"

/**
 * The component managing internships fetching and managing internships list.
 */
export const InternshipsListCompany = (props) => {
  const { id } = props
  const { t } = useTranslation("translation")
  const { status, resetManager, getStartUps, getInternships, filters } = useContext(Work20Context)

  const [alertStartUp, setAlertStartUp] = useState(false)
  const [alertInternship, setAlertInternship] = useState(false)
  const classes = useStyles()

  const [startUps, loadingStartUps, errorStartUps] = getStartUps
  const [internships, loadingInternships, errorInternships] = getInternships

  const loading = loadingStartUps || loadingInternships

  const data = !loading && startUps && internships
    ? mergeStartUpsInternships(startUps, internships)
    : []

  useEffect(() => {
    if (errorStartUps) {
      setAlertStartUp(true)
    }

    if (errorInternships) {
      setAlertInternship(true)
    }
  }, [errorStartUps, errorInternships])

  const handleCloseAlertStartUp = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setAlertStartUp(false)
  }

  const handleCloseAlertInternship = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setAlertInternship(false)
  }
  const filteredInternships = data.filter((internship) => internship.startUpId === id)

  return (
    <Box>
      <Work20Popup status={status} resetManager={resetManager} />
      <PopUp
        open={alertStartUp}
        handleClose={handleCloseAlertStartUp}
        severity="error"
        text={t("work20.startUp.alert.get")}
      />
      <PopUp
        open={alertInternship}
        handleClose={handleCloseAlertInternship}
        severity="error"
        text={t("work20.internship.alert.get")}
      />
      {loading
        ? <Box className={classes.center}>
          <CircularProgress size={100}/>
        </Box>

        : <Stack
          direction="column"
          spacing={2}
        >
          <Box className={classes.center}>
            <InternshipsList internships={filteredInternships} />
          </Box>
        </Stack>
      }
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  center: {
    ...center
  },
  paper: {
    backgroundColor: theme.palette.common.black, // white
    borderColor: theme.palette.common.white, // white
    width: "75vw",
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
      maxWidth: theme.typography.pxToRem(800),
    },
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}))
