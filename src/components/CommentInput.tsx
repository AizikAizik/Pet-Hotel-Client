import {
  Button,
  createStyles,
  Group,
  InputWrapper,
  Textarea,
} from "@mantine/core";
import { Rating } from "react-simple-star-rating";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useBooleanToggle } from "@mantine/hooks";
import axios, { AxiosRequestConfig } from "axios";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  form: {},
  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

interface CommentInputProps {
  id: string;
}

export default function CommentInput(props: CommentInputProps) {
  const { classes } = useStyles();
  const [rating, setRating] = useState(0);
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });
  type FormValues = typeof form.values;
  const handleRating = (rate: number) => {
    console.log((rate * 5) / 100);
    setRating((rate * 5) / 100);
  };

  const handleSubmit = async (values: FormValues) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    try {
      let config: AxiosRequestConfig<any> = {
        method: "post",
        url: `https://peaceful-garden-90498.herokuapp.com/api/hotel/${props.id}/comment`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({ comment: values.comment, rating: rating }),
      };
      const { data } = await axios(config);
      form.reset();
      setRating(0);
      showNotification({
        color: "teal",
        icon: <Check />,
        title: "Comment sent!",
        message: data.message,
      });
    } catch (error: any) {
      form.reset();
      setRating(0);
      showNotification({
        color: "red",
        icon: <X />,
        title: "error in sending comment",
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      <InputWrapper required label="Rating" description="rate this hotel">
        <Rating size={22} onClick={handleRating} ratingValue={rating} />
      </InputWrapper>
      <Textarea
        required
        label="Your Comment"
        placeholder="Describe your experience with this hotel"
        minRows={4}
        mt="md"
        {...form.getInputProps("comment")}
        classNames={{ input: classes.input, label: classes.inputLabel }}
      />
      <Group position="right" mt="md">
        <Button type="submit" className={classes.control}>
          Make Comment
        </Button>
      </Group>
    </form>
  );
}
