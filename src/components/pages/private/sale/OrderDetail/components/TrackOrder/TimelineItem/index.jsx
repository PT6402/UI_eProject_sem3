/* eslint-disable react/prop-types */

// Custom styles for the TimelineItem
import { UIBadge, UIBox, UITypography } from "../../../../../../../common";
import { Icon } from "@mui/material";
import { timelineItem, timelineItemIcon } from "./styles";

function TimelineItem({
  color,
  icon,
  title,
  dateTime,
  description,
  badges = [],
  lastItem,
}) {
  const renderBadges =
    badges.length > 0
      ? badges.map((badge, key) => {
          const badgeKey = `badge-${key}`;

          return (
            <UIBox key={badgeKey} mr={key === badges.length - 1 ? 0 : 0.5}>
              <UIBadge color={color} size="xs" badgeContent={badge} container />
            </UIBox>
          );
        })
      : null;

  return (
    <UIBox
      position="relative"
      sx={(theme) => timelineItem(theme, { lastItem })}>
      <UIBox
        bgColor={"white"}
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="2px"
        zIndex={2}>
        <Icon sx={(theme) => timelineItemIcon(theme, { color })}>{icon}</Icon>
      </UIBox>
      <UIBox
        ml={5.75}
        pt={description ? 0.7 : 0.5}
        lineHeight={0}
        maxWidth="30rem">
        <UITypography variant="button" fontWeight="medium" color={"dark"}>
          {title}
        </UITypography>
        <UIBox mt={0.5}>
          <UITypography variant="caption" fontWeight="medium" color={"text"}>
            {dateTime}
          </UITypography>
        </UIBox>
        <UIBox mt={2} mb={1.5}>
          {description ? (
            <UITypography variant="button" fontWeight="regular" color="text">
              {description}
            </UITypography>
          ) : null}
        </UIBox>
        {badges.length > 0 ? (
          <UIBox display="flex" pb={lastItem ? 1 : 2}>
            {renderBadges}
          </UIBox>
        ) : null}
      </UIBox>
    </UIBox>
  );
}

export default TimelineItem;
