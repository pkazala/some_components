
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import makeStyles from "@mui/styles/makeStyles"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"

import { Work20Context } from "../../api/api"
import { center } from "../../theme"
import { CustomTextInput } from "../custom-input/custom-text-input"
import { FormHeader } from "../header/form-header"
import { PopUp } from "../pop-up/pop-up"
import { Work20Popup } from "./work20-pop-up"

/**
* A component displaying the Work 2.0 start-up edit form.
*/
export const StartUpEditForm = (props) => {
  const { t } = useTranslation("translation")
  const { initialStartUp } = props
  const [startUp, setStartUp] = useState(initialStartUp)
  const [alert, setAlert] = useState(false)
  const { status, processing, resetManager, editStartUp } = useContext(Work20Context)

  const classes = useStyles()

  const handleChange = (event) => {
    const { name, value } = event.target
    setStartUp({ ...startUp, [name]: value })
  }

  const handleChangeLogo = (event) => {
    const { files } = event.target
    setStartUp({ ...startUp, logo: files[0] })
  }

  const handleChangeArchived = () => {
    setStartUp({ ...startUp, archived: !startUp.archived })
  }

  const handleSubmit = async () => {
    const { name, logo, url, email, numEmployees } = startUp
    if (name === "" || logo === "" || url === "" || email === "" || numEmployees === "") {
      setAlert(true)
      return
    }

    await editStartUp(startUp)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setAlert(false)
  }

  return (
    <Container className={classes.center}>
      <Work20Popup status={status} resetManager={resetManager} />
      <Box className={classes.box}>
        {processing
          ? <Box className={classes.progressBox}>
            <LinearProgress />
          </Box>
          : null
        }
        <FormHeader text={t("work20.startUp.edit")}/>
        <Stack
          direction="column"
          spacing={3}
        >
          {/* Start-up edit form. */}

          {/* Start-up name */}
          <CustomTextInput
            id="name-input"
            label={t("work20.startUp.name")}
            placeholder={t("work20.startUp.name")}
            name="name"
            initialValue={startUp.name}
            onBlur={handleChange}
          />

          {/* Start-up logo */}
          <Box>
            <Typography color="textPrimary" className={classes.label}>
              {t("work20.startUp.logo")}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <label htmlFor="logo-upload">
                <input
                  accept="image/*"
                  id="logo-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChangeLogo}
                />
                <Button variant="contained" component="span">
                  {t("work20.startUp.logoUpload")}
                </Button>
              </label>
              <Typography color="textPrimary" className={classes.text}>
                {startUp.logo.name
                  ? <span>{t("work20.startUp.file")} {startUp.logo.name}</span>
                  : t("work20.startUp.fileUnchanged")
                }
              </Typography>
            </Stack>
          </Box>

          {/* Start-up url */}
          <CustomTextInput
            id="url-input"
            label={t("work20.startUp.url")}
            placeholder={t("work20.startUp.url")}
            name="url"
            initialValue={startUp.url}
            onBlur={handleChange}
          />

          {/* Start-up email */}
          {/*           <CustomTextInput
            id="email-input"
            label={t("work20.startUp.email")}
            placeholder={t("work20.startUp.email")}
            name="email"
            initialValue={startUp.email}
            onBlur={handleChange}
          /> */}

          {/* Start-up number of employees */}
          {/*           <CustomSelectInput
            label={t("work20.startUp.numEmployees")}
            id="num-employees-input"
            name="numEmployees"
            initialValue={startUp.numEmployees}
            onBlur={handleChange}
            items={numsEmployees}
          /> */}

          <Box>
            <Typography color="textPrimary" className={classes.label}>
              {t("work20.startUp.archived")}
            </Typography>
            <Switch
              checked={startUp.archived}
              onChange={handleChangeArchived}
              className={classes.switch}
            />
          </Box>
          <Box className={classes.center}>
            <Button
              id="start-up-submit-button"
              variant="contained"
              disabled={processing}
              onClick={handleSubmit}
              className={classes.button}
            >
              {t("work20.startUp.button.edit")}
            </Button>
          </Box>
        </Stack>
      </Box>
      <PopUp
        open={alert}
        handleClose={handleClose}
        severity="error"
        text={t("work20.alert.empty")}
      />
    </Container>
  )
}

StartUpEditForm.propTypes = {
  initialStartUp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired
}

const useStyles = makeStyles((theme) => ({
  box: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  button: {
    width: "80vw",
    [theme.breakpoints.up("sm")]: {
      width: theme.typography.pxToRem(300),
    },
  },
  center: {
    ...center,
  },
  selectForm: {
    width: "80vw",
    maxWidth: theme.typography.pxToRem(800),
  },
  selectInput: {
    "&.MuiOutlinedInput-root": {
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.black,
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
      }
    }
  },
  switch: {
    "& .MuiSwitch-track": {
      backgroundColor: "white",
    }
  },
  input: {
    width: "80vw",
    maxWidth: theme.typography.pxToRem(800),
    "& .MuiOutlinedInput-root": {
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
      }
    }
  },
  label: {
    fontSize: theme.typography.pxToRem(18),
    paddingBottom: theme.spacing(1),
  },
  text: {
    fontSize: theme.typography.pxToRem(16),
  },
  progressBox: {
    width: "100%"
  }
}))
