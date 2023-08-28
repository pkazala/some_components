import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import makeStyles from "@mui/styles/makeStyles"
import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { Work20Context } from "../../api/api"
import { center } from "../../theme"

/**
 * The page for displaying all start-ups
 */
export const LogosContainer = () => {
  const { getStartUps } = useContext(Work20Context)

  const classes = useStyles()

  const [data, loading] = getStartUps

  return (
    <Container className={classes.container}>
      {loading
        ? <Box className={classes.center}>
          <CircularProgress size={100}/>
        </Box>
        : <Box className={classes.center}>
          <ul className={classes.list}>
            {data.map((company) => (
              <li key={company.id}>
                <Link to={company.name}><img src={company.logo} alt="logo" className={classes.companyItem}></img></Link>
              </li>
            ))}
          </ul>
        </Box>
      }
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  center: {
    ...center
  },
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(1),
    color: "white",
    width: "90vw",

  },
  list: {
    listStyleType: "none",
    justifyContent: "center",
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      gap: "2rem",
      width: "70vw",
      paddingLeft: "min(20%, 15.625rem)", // 250 px
      paddingRight: "min(20%, 15.625rem)", // 250 px
      maxWidth: theme.typography.pxToRem(800),
    },
  },
  companyItem: {
    display: "flex",
    padding: ".5em",
    borderRadius: ".5em",
    height: "3em",
    width: "5em",
    objectFit: "contain",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      height: "5em",
      width: "7em",
      padding: ".7em",
    },
  }
}))
