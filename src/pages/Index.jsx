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

  const handlePDFDownload = () => {
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

    const fileName = file.name.replace(/\..+$/, ".pdf");
    const url = window.URL.createObjectURL(new Blob([file], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    toast({
      title: "PDF created",
      description: `A new PDF file has been created and downloaded: ${fileName}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const [question, setQuestion] = useState("");
  const handleQuestionChange = (event) => setQuestion(event.target.value);

  const handleQuestionSubmit = () => {
    if (!file) {
      toast({
        title: "No file loaded",
        description: "Please upload a file before asking questions.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const answer = "This is a simulated answer based on the uploaded document.";
    toast({
      title: "Answer",
      description: answer,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Input type="file" onChange={handleFileChange} accept=".txt,.doc,.docx,.pdf,.xlsx" />
      <Button leftIcon={<FaFileUpload />} colorScheme="blue" mt={3} onClick={handleUpload}>
        Upload and Process <FaFileDownload />
      </Button>
      <Button leftIcon={<FaFileDownload />} colorScheme="green" mt={3} ml={3} onClick={handlePDFDownload}>
        Export as PDF
      </Button>
      <Input placeholder="Ask a question about the document..." mt={3} value={question} onChange={handleQuestionChange} />
      <Button colorScheme="purple" mt={3} onClick={handleQuestionSubmit}>
        Submit Question
      </Button>
    </Box>
  );
};

export default Index;
