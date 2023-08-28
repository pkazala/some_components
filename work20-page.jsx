import Box from "@mui/material/Box"
import makeStyles from "@mui/styles/makeStyles"
import React, { useContext } from "react"

import { AuthContext } from "../../api/api"
import {
  AdminNavBar,
  InternshipsListManager,
  Work20Header,
  Work20Info,
} from "../../components"

/**
 * The Work 2.0 page.
 */
export const Work20Page = () => {
  const { getAuth } = useContext(AuthContext)
  const [user] = getAuth

  const classes = useStyles()

  return (
    <Box>
      {user
        ? <AdminNavBar />
        : null
      }
      <Box className={classes.headerBox}>
        <Work20Header />
      </Box>
      <Box className={classes.contentBox}>
        <Work20Info />
      </Box>
      <Box className={classes.contentBox}>
        <InternshipsListManager />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  contentBox: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  headerBox: {
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(3),
  },
}))
