import React, { useState } from "react";
import {
  createStyles,
  Navbar,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { Settings, User, CheckupList, Logout } from "tabler-icons-react";
import { Logo } from "../shared/Logo";
import { FaDog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions } from "../../state/store";
import { useModals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7],
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: "44px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
      color: theme.white,
    },
  },
}));

const mainLinksMockdata = [
  { icon: User, label: "profile" },
  { icon: FaDog, label: "pets" },
  { icon: CheckupList, label: "bookings" },
  { icon: Settings, label: "settings" },
  { icon: Logout, label: "logout" },
];

const linksMockdata = ["profile", "pets", "bookings", "settings", "logout"];

export default function DashBoard() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("My Profile");
  const [activeLink, setActiveLink] = useState(linksMockdata[0]);
  const navigate = useNavigate();
  const modals = useModals();

  const userLogoutAction = useStoreActions(
    (action) => action.userSession.logout
  );
  const profileAction = useStoreActions(
    (action) => action.profile.setUserProfile
  );

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete Pet`,
      centered: true,
      children: <Text size="sm">Are you sure you want to logout ?</Text>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        userLogoutAction();
        //@ts-ignore
        profileAction(localStorage.getItem("userProfile")!);
        navigate(`/login`);
      },
    });

  const mainLinks = mainLinksMockdata.map((link, idx) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionDuration={0}
      key={link.label}
    >
      {link.label === "logout" ? (
        <UnstyledButton
          onClick={() => {
            setActive(link.label);
            setActiveLink(linksMockdata[idx]);
            openDeleteModal();
          }}
          className={cx(classes.mainLink, {
            [classes.mainLinkActive]: link.label === active,
          })}
        >
          <link.icon />
        </UnstyledButton>
      ) : (
        <UnstyledButton
          onClick={() => {
            setActive(link.label);
            setActiveLink(linksMockdata[idx]);
            navigate(`/dashboard/${link.label}`);
          }}
          className={cx(classes.mainLink, {
            [classes.mainLinkActive]: link.label === active,
          })}
        >
          <link.icon />
        </UnstyledButton>
      )}
    </Tooltip>
  ));

  const links = linksMockdata.map((link, idx) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link,
      })}
      to={`/dashboard/${link}`}
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
        setActive(mainLinksMockdata[idx].label);
        navigate(`/dashboard/${link}`);
      }}
      key={link}
    >
      {link}
    </Link>
  ));

  return (
    <>
      <Navbar height={750} width={{ sm: 300 }}>
        <Navbar.Section grow className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>
              <Logo />
            </div>
            {mainLinks}
          </div>
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>

            {links}
          </div>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
