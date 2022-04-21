import React, { useState } from "react";
import {
  Group,
  Button,
  createStyles,
  TextInput,
  Space,
  NativeSelect,
  NumberInput,
  Textarea,
  Avatar,
  Notification,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
} from "../../state/store";
import { X } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

interface AddPetProps {
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddPet({ toggleDrawer }: AddPetProps) {
  const { classes } = useStyles();
  const [fileInputState] = useState("");
  //const [selectedFile, setSelectedFile] = useState("");
  const [petName, setPetName] = useInputState("");
  const [breed, setBreed] = useInputState("");
  const [pet, setPet] = useInputState<"Dog" | "Cat">("Dog");
  const [age, setAge] = useInputState(0);
  const [likes, setLikes] = useInputState("");
  const [dislikes, setDisLikes] = useInputState("");

  const [previewSource, setPreviewSource] = useState<any>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // state variables
  const petState = useStoreState((state) => state.pet);
  const { isLoading, petInfo, error } = petState;

  const addPetAction = useStoreActions((action) => action.pet.AddPet);
  const dispatch = useStoreDispatch();

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      addPetAction({
        pet,
        image: previewSource,
        breed,
        age,
        likes,
        dislikes,
        name: petName,
      })
    );
    toggleDrawer(false);
    console.log("data added Successfully");
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Space h="xl" />
        <Avatar src={previewSource} alt="Pet Image" size="xl" />
        {error && (
          <>
            <Space h="lg" />
            <Notification
              icon={<X size={18} />}
              color="red"
              title="Error Occured"
            >
              {error}
            </Notification>
          </>
        )}

        <form>
          <Group direction="column" mt="lg" grow>
            <input
              type="file"
              name="image"
              onChange={handleFileInputChange}
              placeholder="upload pet image"
              value={fileInputState}
              required={true}
            />

            <TextInput
              label="Pet Name"
              placeholder="Dog"
              required
              value={petName}
              onChange={setPetName}
            />

            <NativeSelect
              data={["Dog", "Cat"]}
              placeholder="Pet"
              label="Pet"
              required
              value={pet}
              onChange={setPet}
            />

            <TextInput
              label="Breed"
              placeholder="breed"
              value={breed}
              onChange={setBreed}
            />

            <NumberInput
              label="Age"
              description="Enter 0 if your pet is less than a year old"
              placeholder="Your Pets age"
              max={120}
              min={0}
              value={age}
              onChange={setAge}
            />

            <Textarea
              placeholder="Likes...."
              label="Likes"
              description="mention some of the likes associated with your pet"
              value={likes}
              onChange={setLikes}
            />

            <Textarea
              placeholder="Dislikes...."
              label="DisLikes"
              description="mention some of the dislikes associated with your pet"
              value={dislikes}
              onChange={setDisLikes}
            />
          </Group>

          <Group position="apart" mt="xl">
            <Button
              type="submit"
              onClick={handleFormSubmit}
              loading={isLoading}
            >
              Add
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
}
