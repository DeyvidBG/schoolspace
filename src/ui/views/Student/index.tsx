import React, { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Button from "../../atoms/Button"
import Typography from "../../atoms/Typography/index"
import AccessibleIcon from "@mui/icons-material/Accessible"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import TuneIcon from "@mui/icons-material/Tune"
import SchoolIcon from "@mui/icons-material/School"
import CloseIcon from "@mui/icons-material/Close"
import FlexBox from "../../atoms/FlexBox/index"
import Drawer from "../../atoms/Drawer"
import Avatar from "../../atoms/Avatar"
import MenuButton from "../../molecules/MenuButton"
import { ColorOptions } from "../../atoms/utils/shared-types"
import { useMediaQuery } from "@mui/material"
import Task from "../../molecules/Task"

interface IStudentViewProps {}

const links = [
  {
    icon: <AccessibleIcon />,
    text: "Homework",
    color: "primary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <AccessibleIcon />,
    text: "All Grades",
    color: "error" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <AccessibleIcon />,
    text: "Schedule",
    color: "secondary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <AccessibleIcon />,
    text: "Settings",
    color: "secondary" as ColorOptions,
    disabled: false,
    onClick: () => {
      console.log("Hello")
    },
  },
  {
    icon: <AccessibleIcon />,
    text: "Options",
    color: "secondary" as ColorOptions,
    disabled: true,
    onClick: () => {
      console.log("Hello")
    },
  },
]

const StudentView: FC<IStudentViewProps> = () => {
  const [isVisible, setIsVisible] = useState(true)
  const matches = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (!matches) {
      setIsVisible(true)
    }
  }, [matches])

  const closeDrawer = () => {
    setIsVisible(false)
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
            <Typography variant="body2" color="secondary">
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
          <Typography variant="body2">Deyvid Popov</Typography>
          <TuneIcon sx={{ cursor: "pointer" }} />
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

export default StudentView
