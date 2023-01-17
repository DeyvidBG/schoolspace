import React, { FC, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Typography from "../../atoms/Typography/index"
import ClassIcon from "@mui/icons-material/Class"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import FeedbackIcon from "@mui/icons-material/Feedback"
import GradeIcon from "@mui/icons-material/Grade"
import SchoolIcon from "@mui/icons-material/School"
import CloseIcon from "@mui/icons-material/Close"
import LogoutIcon from "@mui/icons-material/Logout"
import FlexBox from "../../atoms/FlexBox/index"
import Drawer from "../../atoms/Drawer"
import MenuButton from "../../molecules/MenuButton"
import { ColorOptions } from "../../atoms/utils/shared-types"
import { useMediaQuery } from "@mui/material"
import { useAuth } from "../../../provider/AuthProvider"
import { Role } from "../../../model/shared-types"

interface ITeacherViewProps {}

const links = [
  {
    icon: <ClassIcon />,
    text: "Classes",
    color: "secondary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <CalendarMonthIcon />,
    text: "Schedule",
    color: "secondary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <GradeIcon />,
    text: "Grades",
    color: "primary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <FeedbackIcon />,
    text: "Feedback",
    color: "error" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
]

const TeacherView: FC<ITeacherViewProps> = () => {
  const [isVisible, setIsVisible] = useState(true)
  const matches = useMediaQuery("(max-width: 768px)")
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!matches) {
      setIsVisible(true)
    }
  }, [matches])

  const closeDrawer = () => {
    setIsVisible(false)
  }

  const handleSignOut = () => {
    signOut(() => {
      sessionStorage.removeItem("jwt")
      navigate("/auth/signin")
    })
  }

  return (
    <div style={{ display: "flex", flex: "1 0 auto", flexFlow: "row nowrap" }}>
      <Drawer visible={isVisible}>
        <FlexBox
          justifyContent={matches ? "space-between" : "flex-start"}
          style={{
            height: "10vh",
            padding: "1rem 1.33rem 1rem 1.73rem",
            border: "0.2rem solid transparent",
            borderBottom: "0.125rem solid var(--grey)",
          }}
        >
          <FlexBox flexDirection="row">
            <SchoolIcon sx={{ color: "var(--blue)" }} />
            <Typography
              variant="body2"
              color="secondary"
              style={{ fontFamily: "Varino" }}
            >
              School Space
            </Typography>
          </FlexBox>
          {matches && (
            <CloseIcon
              sx={{ color: "var(--blue)", cursor: "pointer" }}
              onClick={closeDrawer}
            />
          )}
        </FlexBox>
        {links.map((link) => (
          <MenuButton
            key={link.text}
            icon={link.icon}
            text={link.text}
            color={link.color}
            disabled={link.disabled}
            onClick={link.onClick}
          />
        ))}
        <FlexBox
          justifyContent={"space-between"}
          style={{
            height: "10vh",
            padding: "1rem 1.33rem 1rem 1.73rem",
            marginTop: "auto",
            border: "0.2rem solid transparent",
            borderTop: "0.125rem solid var(--grey)",
          }}
        >
          <Typography variant="body2">
            {user?.firstName + " " + user?.lastName} AS{" "}
            <b>{Role[user?.role as number]}</b>
          </Typography>
          <LogoutIcon sx={{ cursor: "pointer" }} onClick={handleSignOut} />
        </FlexBox>
      </Drawer>
      <div
        style={{
          width: matches ? "100%" : "calc(100% - 20%)",
          height: "100vh",
          backgroundColor: "var(--grey)",
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default TeacherView
