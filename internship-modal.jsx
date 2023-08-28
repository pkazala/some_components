import PeopleIcon from "@mui/icons-material/People"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import makeStyles from "@mui/styles/makeStyles"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

import { AuthContext, Work20Context } from "../../api/api"
import { center } from "../../theme"
import { CustomRichTextDisplay } from "../custom-rich-text-display/custom-rich-text-display"
import { DeleteModal } from "./delete-modal"
import { InfoField } from "./info-field"
import { InternshipApplyButton } from "./internship-apply-button"

export const InternshipModal = (props) => {
  const { open, handleClose, internship } = props
  const {
    startUpName, startUpLogo, startUpUrl,
    id, name, industries, deadline, description,
    requiredExperiencesActive, requiredExperiences, duration,
    salaryActive, salary, locationActive, location, link
  } = internship
  const { t } = useTranslation("translation")
  const [openDelete, setOpenDelete] = useState(false)

  const { getAuth } = useContext(AuthContext)
  const [user] = getAuth

  const { deleteInternship } = useContext(Work20Context)

  const { breakpoints, typography } = useTheme()
  const classes = useStyles()
  const upSmall = useMediaQuery(breakpoints.up("sm"))

  const handleDelete = async () => {
    setOpenDelete(false)

    await deleteInternship(id)
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box>
        <Paper variant="outlined" className={classes.paper}>
          <DeleteModal
            open={openDelete}
            handleClose={handleCloseDelete}
            text={t("work20.internship.confirmDelete")}
            handleDelete={handleDelete}
          />
          <Grid
            container
            direction="column"
            spacing={2}
          >
            {/* Header */}
            <Grid
              container
              item
              direction="row"
              spacing={1}
            >
              {/* Start-up logo */}
              <Grid
                container
                item
                justifyContent="center"
                xs={2}
                sm={2}
                md={1}
              >
                <Box
                  className={classes.logoBox}
                  component="a"
                  href={startUpUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    src={startUpLogo}
                    style={{
                      width: typography.pxToRem(upSmall ? normalLogo : smallLogo)
                    }}
                    alt={startUpName}
                  />
                </Box>
              </Grid>
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                spacing={1}
                xs
                sm
                md
              >
                {/* Start-up information */}
                <Grid item>
                  <Typography className={classes.title}>
                    {startUpName}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                >
                </Grid>
              </Grid>
              {/* Apply button */}
              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                xs={3}
                sm={2}
                md={2}
              >
                <Grid item>
                  <InternshipApplyButton applyLink={link}
                    size={upSmall ? "medium" : "small"}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Divider variant="fullWidth"/>
            </Grid>

            {/* Internship information */}
            <Grid container item>
              <Stack
                direction="column"
                spacing={2}
                className={classes.stack}
              >
                {/* Internship name */}
                <Box>
                  <Typography className={classes.name}>
                    {name}
                  </Typography>
                </Box>

                {/* Application deadline */}
                <InfoField
                  title={t("work20.internship.deadlineApplication")}
                  text={deadline}
                />
                {/* Internship description */}
                <CustomRichTextDisplay
                  label={t("work20.internship.description")}
                  defaultValue={description}
                />

                {/* Internship duration */}
                <CustomRichTextDisplay
                  label={t("work20.internship.duration")}
                  defaultValue={duration}
                />
                {/* <InfoField
                  title={t("work20.internship.duration")}
                  text={durationShort}
                /> */}

                {/* Internship location */}
                {locationActive
                  ? <CustomRichTextDisplay
                    label={t("work20.internship.location")}
                    defaultValue={location}
                  />
                  : null
                }

                {/* Internship salary */}
                {salaryActive
                  ? <CustomRichTextDisplay
                    label={t("work20.internship.salary")}
                    defaultValue={salary}
                  />
                  : null
                }

                {/* Internship required experiences */}
                {requiredExperiencesActive
                  ? <CustomRichTextDisplay
                    label={t("work20.internship.requiredExperiences")}
                    defaultValue={requiredExperiences}
                  />
                  : null
                }

                {/* Internship industries */}
                <InfoField
                  title={t("work20.internship.titleIndustries")}
                  text={industries.join(", ")}
                />

                {/* Internship type */}
                {/* <InfoField
                  title={t("work20.internship.type")}
                  text={type}
                /> */}
              </Stack>
            </Grid>

            <Grid item>
              <Divider variant="fullWidth"/>
            </Grid>

            {/* Buttons */}
            <Grid
              container
              item
              direction="row"
            >
              {user
                ? <Grid
                  container
                  item
                  direction="row"
                  spacing={1}
                  xs
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      size={upSmall ? "medium" : "small"}
                      component={NavLink}
                      to={`/admin/work20/internship/edit/${id}`}
                    >
                      {t("work20.internship.button.edit")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size={upSmall ? "medium" : "small"}
                      onClick={handleOpenDelete}
                    >
                      {t("work20.internship.button.delete")}
                    </Button>
                  </Grid>
                </Grid>
                : null
              }
              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                xs
              >
                <Button
                  variant="outlined"
                  size={upSmall ? "medium" : "small"}
                  onClick={handleClose}
                >
                  {t("work20.internship.close")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  )
}

InternshipModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  internship: PropTypes.shape({
    startUpId: PropTypes.string.isRequired,
    startUpName: PropTypes.string.isRequired,
    startUpLogo: PropTypes.string.isRequired,
    startUpUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    industries: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    requiredExperiencesActive: PropTypes.bool.isRequired,
    requiredExperiences: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    salaryActive: PropTypes.bool.isRequired,
    salary: PropTypes.string.isRequired,
    locationActive: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired,
}

const smallLogo = 40
const normalLogo = 60

const smallBox = 50
const normalBox = 70

const useStyles = makeStyles((theme) => ({
  editor: {
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  icon: {
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(24)
    },
  },
  logoBox: {
    ...center,
    height: theme.typography.pxToRem(smallBox),
    width: theme.typography.pxToRem(smallBox),
    [theme.breakpoints.up("sm")]: {
      height: theme.typography.pxToRem(normalBox),
      width: theme.typography.pxToRem(normalBox),
    },
  },
  name: {
    color: theme.palette.primary.dark,
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(2),
    width: "80vw",
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.typography.pxToRem(1000),
      maxHeight: "90vh",
    },
  },
  stack: {
    height: "60vh",
    width: "100%",
    overflowY: "auto",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      maxHeight: theme.typography.pxToRem(600),
    },
  },
  text: {
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.typography.pxToRem(10),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  title: {
    color: theme.palette.common.black,
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}))
