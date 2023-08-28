import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import makeStyles from "@mui/styles/makeStyles"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

import { AuthContext, Work20Context } from "../../api/api"
import { center } from "../../theme"
import { DeleteModal } from "./delete-modal"
import { InternshipApplyButton } from "./internship-apply-button"
import { InternshipModal } from "./internship-modal"

export const InternshipsListItem = (props) => {
  const { internship } = props
  const {
    startUpName, startUpLogo, startUpUrl,
    id, name, type, durationShort, industries, link
  } = internship
  const { t } = useTranslation("translation")
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { getAuth } = useContext(AuthContext)
  const [user] = getAuth

  const { deleteInternship } = useContext(Work20Context)

  const { breakpoints, typography } = useTheme()
  const upSmall = useMediaQuery(breakpoints.up("sm"))
  const upLarge = useMediaQuery(breakpoints.up("lg"))

  const classes = useStyles()

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper variant="outlined" className={classes.paper}>
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        text={t("work20.internship.confirmDelete")}
        handleDelete={handleDelete}
      />
      <InternshipModal
        open={open}
        handleClose={handleClose}
        internship={internship}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
      >
        {/* Start-up information */}
        <Grid item>
          <Box className={classes.startUpBox}>
            <Grid
              container
              direction="row"
            >
              <Grid
                container
                item
                justifyContent="center"
                xs={4}
                sm={3}
                md={2}
                className={classes.gridRightPadding}
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
              <Divider orientation="vertical" flexItem className={classes.divider} />
              <Grid
                container
                item
                direction="column"
                xs
                sm
                md
                className={classes.gridLeftPadding}
              >
                <Grid item className={classes.gridBottomPadding}>
                  <Typography color="textPrimary" className={classes.title}>
                    {startUpName} - {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textPrimary" className={classes.text}>
                    <Link
                      href={startUpUrl}
                      color="inherit"
                      underline="always"
                      target="_blank"
                      rel="noopener"
                    >
                      {t("work20.startUp.visitPage")}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              {/* Admin options */}
              {user
                ? <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-end"
                  spacing={1}
                  xs={3}
                  sm={3}
                  md={3}
                >
                  <Grid item>
                    <Tooltip
                      title={t("work20.internship.button.edit")}
                      arrow
                      placement="bottom"
                    >
                      <IconButton
                        aria-label="edit-start-up"
                        size={upSmall ? "medium" : "small"}
                        component={NavLink}
                        to={`/admin/work20/internship/edit/${id}`}
                        className={classes.iconButton}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip
                      title={t("work20.internship.button.delete")}
                      arrow
                      placement="bottom"
                    >
                      <IconButton
                        aria-label="delete-start-up"
                        size={upSmall ? "medium" : "small"}
                        onClick={handleOpenDelete}
                        className={classes.iconButton}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                : null
              }
            </Grid>
          </Box>
        </Grid>
        {/* Internship information */}
        <Grid
          container
          item
          justifyContent="center"
        >
          <Paper
            variant="outlined"
            className={classes.internshipPaper}
          >
            <Grid
              container
              direction={upLarge ? "row" : "column"}
            >
              <Grid
                container
                item
                direction="row"
                alignItems="center"
                xs={6}
                md={8}
                onClick={handleOpen}
                className={classes.gridInternship}
              >
                <Grid item>
                  <Typography color="textPrimary" className={classes.text}>
                    {t("work20.internship.work")} {type.toLowerCase()}{" ● "}
                    {durationShort}{" ● "}
                    {industries.sort().join(", ")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs
                md
              >
                <Stack
                  direction="column"
                  spacing={1}
                >
                  <Button
                    variant="outlined"
                    onClick={handleOpen}
                    className={classes.viewButton}
                  >
                    {t("work20.internship.view")}
                  </Button>
                  <InternshipApplyButton applyLink={link}
                    className={classes.button}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

InternshipsListItem.propTypes = {
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
    durationShort: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    salaryActive: PropTypes.bool.isRequired,
    salary: PropTypes.string.isRequired,
    locationActive: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
}

const smallLogo = 50
const normalLogo = 70

const smallBox = 60
const normalBox = 80

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
  },
  divider: {
    background: theme.palette.common.black,
  },
  gridInternship: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("lg")]: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(0),
    },
  },
  gridBottomPadding: {
    paddingBottom: theme.spacing(1),
  },
  gridLeftPadding: {
    paddingLeft: theme.spacing(1),
  },
  gridRightPadding: {
    paddingRight: theme.spacing(1),
  },
  gridButton: {
    paddingBottom: theme.spacing(1),
  },
  viewButton: {
    // borderColor: theme.palette.common.white, // origin
    // color: theme.palette.common.white, // origin
    borderColor: theme.palette.common.black, // white
    color: theme.palette.common.black, // white
    width: "100%",
  },
  icon: {
    color: theme.palette.common.black, // white
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(24)
    },
  },
  iconButton: {
    // color: theme.palette.common.white, // origin
    color: theme.palette.common.black, // white
  },
  internshipPaper: {
    backgroundColor: "inherit",
    // borderColor: theme.palette.common.white, // origin
    borderColor: theme.palette.common.black, // white
    width: "100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    "&:hover": {
      borderColor: theme.palette.primary.main
    },
  },
  logoBox: {
    ...center,
    // borderColor: theme.palette.common.black,
    // borderStyle: "solid",
    // borderWidth: theme.typography.pxToRem(1),
    // borderRadius: theme.typography.pxToRem(3),
    height: theme.typography.pxToRem(smallBox),
    width: theme.typography.pxToRem(smallBox),
    [theme.breakpoints.up("sm")]: {
      height: theme.typography.pxToRem(normalBox),
      width: theme.typography.pxToRem(normalBox),
    },
  },
  startUpBox: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  text: {
    color: theme.palette.common.black, // white
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  title: {
    color: theme.palette.common.black, // white
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  paper: {
    // backgroundColor: theme.palette.common.black, //origin
    // borderColor: theme.palette.common.white, //origin
    backgroundColor: theme.palette.common.white, // white
    borderColor: theme.palette.common.black, // white
    // backgroundColor: theme.palette.primary.main, // pink
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }
}))
