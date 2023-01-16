import { FC } from "react"
import Button from "../../atoms/Button"
import FlexBox from "../../atoms/FlexBox"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Typography from "../../atoms/Typography"
import { ColorOptions } from "../../atoms/utils/shared-types"
import PropTypes from "prop-types"

interface IMenuButtonProps {
  icon: React.ReactNode
  text: string
  color: ColorOptions
  disabled: boolean
  onClick: () => void
}

const MenuButton: FC<IMenuButtonProps> = ({
  icon,
  text,
  color,
  disabled,
  onClick,
}) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <Button
      type="button"
      variant="menu"
      color={color}
      disabled={disabled}
      width="100%"
      onClick={handleClick}
    >
      <FlexBox
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <FlexBox
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
          <Typography variant="body2">{text}</Typography>
        </FlexBox>
        <ArrowForwardIosIcon />
      </FlexBox>
    </Button>
  )
}

MenuButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf<ColorOptions>([
    "primary",
    "secondary",
    "info",
    "error",
  ]).isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MenuButton
