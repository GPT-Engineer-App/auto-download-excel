import { Button, Box, Input, useToast } from "@chakra-ui/react";
import { FaFileUpload, FaFileDownload } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate file processing and Excel file creation
    const fileName = file.name.replace(/\..+$/, ".xlsx");
    const url = window.URL.createObjectURL(new Blob([file], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    toast({
      title: "File processed",
      description: `A new Excel file has been created and downloaded: ${fileName}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Input type="file" onChange={handleFileChange} accept=".txt,.doc,.docx,.pdf" />
      <Button leftIcon={<FaFileUpload />} colorScheme="blue" mt={3} onClick={handleUpload}>
        Upload and Process <FaFileDownload />
      </Button>
    </Box>
  );
};

export default Index;