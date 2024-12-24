const SampleData1 = {
    header: "Your Name",
    picture: {
      src: "images/cv_image.png",
      alt: "Your name",
    },
    contact: [
      { icon: "📞", value: "+49 17636842373" },
      { icon: "✉️", value: "yourmail@mail.com", link: "mailto:youlmail@mail.com" },
      { icon: "📍", value: "Goettingen, Robert Koch Str. 38" },
      { icon: "🔗", value: "LinkedIn", link: "https://www.linkedin.com/in/your-profile" },
      { icon: "🔗", value: "GitHub", link: "https://github.com/Your-Profile" },
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
        startDate: "April 2023",
        endDate: "October 2025",
        description: "",
      },
    ],
    projects: [
      {
        title: "Master's Praxis Project - UR5e Robot",
        description:
          "Worked on advanced motion planning, robotic manipulation, and sensor integration using the UR5e robotic arm.",
        startDate: "April 2024",
        endDate: "July 2024",
      },
    ],
    workExperience: [
      {
        title: "Student Assistant - HAWK University",
        company: "HAWK University, Goettingen, Germany",
        description:
          "Working on integrating the Zivid 3D camera with robotics for sensor-based automation, focusing on object detection and manipulation tasks using ROS2.",
        startDate: "August 2024",
        endDate: "Present",
      },
    ],
  };
  
  export default SampleData1;
  