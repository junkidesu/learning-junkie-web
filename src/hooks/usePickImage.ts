import { useFilePicker } from "use-file-picker";

export interface Props {
  image: File | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const usePickImage = ({ image, setImage }: Props) => {
  const { openFilePicker, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onFilesSuccessfullySelected: (files) => {
      setImage(files.plainFiles[0]);
    },
  });

  const openImagePicker = () => {
    clear();
    openFilePicker();
  };

  const reset = () => {
    clear();
  };

  const imageContent = image && filesContent[0].content;

  return { openImagePicker, reset, imageContent };
};

export default usePickImage;
