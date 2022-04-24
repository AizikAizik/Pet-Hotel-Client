import {
  Container,
  createStyles,
  Header,
  Group,
  Burger,
  Paper,
  Transition,
  Avatar,
  Badge,
  Button,
  Space,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../shared/Logo";

const HEADER_HEIGHT = 70;
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 99,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "12px 20px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  profileLink: {
    display: "flex",
    alignItems: "center",
    padding: "0px 6px",
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.teal[6],
      color: theme.colors.teal[0],
    },
  },
}));

interface PageHeaderProps {
  links: { link: string; label: string }[];
}

export default function PageHeader({ links }: PageHeaderProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
        toggleOpened(false);
      }}
    >
      {link.label}
    </Link>
  ));

  const profileLink = () => {
    return (
      <Link
        to="/dashboard/profile"
        className={cx(classes.link, classes.profileLink)}
      >
        Profile
        <Space mr={"xs"} />
        <Avatar src={null} alt="Joy Ajiboye" radius="xl">
          JA
        </Avatar>
      </Link>
    );
  };
  return (
    <Header
      sx={{ background: "#FFF2BD", border: "none" }}
      height={HEADER_HEIGHT}
      className={classes.root}
    >
      <Container className={classes.header}>
        <Logo />
        <Group spacing={5} className={classes.links}>
          {items}
          {profileLink()}
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {profileLink()}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
