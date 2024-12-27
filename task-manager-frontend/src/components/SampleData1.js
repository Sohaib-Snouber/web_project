const SampleData1 = {
    header: "Your Name",
    picture: {
      src: "images/cv_image.png",
      alt: "Your name",
    },
    contact: [
      { icon: "📞", value: "+49 17636842373" },
    ],
    skills: [
      { name: "Time management", rating: 5 },
    ],
    softwareSkills: [
      { name: "Python", rating: 5 },
    ],
    languages: [
      { name: "English", rating: 5 },
    ],
    summary:
      "short summary about yourself",
    education: [
      {
        degree: "Bachelor's in Electrical and Information Engineering",
        institution: "HAWK University, Goettingen, Germany",
        startDate: "2023-04",
        endDate: "2025-10",
        description: "",
        isPresent: false,
      },
    ],
    projects: [
      {
        title: "Master's Praxis Project - UR5e Robot",
        description:
          "Worked on advanced motion planning, robotic manipulation, and sensor integration using the UR5e robotic arm.",
        startDate: "2024-04",
        endDate: "2024-07",
        isPresent: false,
      },
    ],
    workExperience: [
      {
        title: "Student Assistant - HAWK University",
        company: "HAWK University, Goettingen, Germany",
        description:
          "Working on integrating the Zivid 3D camera with robotics for sensor-based automation, focusing on object detection and manipulation tasks using ROS2.",
        startDate: "2024-08",
        endDate: "",
        isPresent: true,
      },
    ],
  };
  
  export default SampleData1;
  