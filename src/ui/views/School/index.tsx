import React, { FC, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Button, Drawer, FlexBox, Typography } from "../../atoms"
import SchoolIcon from "@mui/icons-material/School"
import CloseIcon from "@mui/icons-material/Close"
import PeopleIcon from "@mui/icons-material/People"
import PercentIcon from "@mui/icons-material/Percent"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuButton from "../../molecules/MenuButton"
import { ColorOptions } from "../../atoms/utils/shared-types"
import { useMediaQuery } from "@mui/material"
import { useAuth } from "../../../provider/AuthProvider"
import { Role } from "../../../model/shared-types"

interface ISchoolViewProps {}

const SchoolView: FC<ISchoolViewProps> = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)
  const matches = useMediaQuery("(max-width: 768px)")

  const links = [
    {
      icon: <PercentIcon />,
      text: "Subjects",
      color: "secondary" as ColorOptions,
      disabled: false,
      onClick: () => {
        navigate("/school/subjects")
      },
    },
    {
      icon: <PeopleIcon />,
      text: "Teachers",
      color: "secondary" as ColorOptions,
      disabled: false,
      onClick: () => {
        navigate("/school/teachers")
      },
    },
  ]

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
            {user?.firstName +
              " " +
              user?.lastName +
              " AS " +
              Role[user?.role as number]}
          </Typography>
          <LogoutIcon sx={{ cursor: "pointer" }} onClick={handleSignOut} />
        </FlexBox>
      </Drawer>
      <div
        style={{
          width: matches ? "100%" : "calc(100% - 20%)",
          height: "100vh",
          backgroundColor: "var(--grey)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default SchoolView
