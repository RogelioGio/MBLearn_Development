import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faCircleChevronLeft, faCircleChevronRight, faForward } from "@fortawesome/free-solid-svg-icons";
import { Step, Stepper, StepperCompleted, useStepper } from "../components/ui/courseStepper";
import { ScrollArea } from "../components/ui/scroll-area";
import CourseAssesment from "./courseComponents/courseAssesment";
import Content from "./courseComponents/courseContent";
import courseCompleted from ".././assets/Course Completed.svg"
import { useStateContext } from "../contexts/ContextProvider";
import { Progress } from "../components/ui/progress";
import Course from "../views/Course";


const CourseModuleProps = ({headers}) => {
    const stepperRef = useRef();
    const [activeStepMeta, setActiveMeta] = useState({title: "", desc: "", stepID:""})
    const {user} = useStateContext()

    //Course Must be thrown here so that the content will be loop in the stepper
    const Lesson = [
         {
            "id": 1,
            "coursed": 1,
            "oldOrderPosition": 0,
            "currentOrderPosition": 4,
            "LessonName": "Disaster Risk Lesson 1",
            "file_path": null,
            "created_at": "2025-05-09T09:30:03.000000Z",
            "updated_at": "2025-05-10T11:15:09.000000Z",
            "Lesson_Type": "Text",
            "LessonContentAsJSON":"{\"type\":\"doc\",\"content\":[{\"headerBlock\":\"heading\",\"attrs\":{\"textAlign\":\"center\",\"level\":1},\"content\":[{\"type\":\"text\",\"text\":\"Understanding Disaster Risk\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":\"center\"}},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"Disaster risk refers to the potential loss of life, injury, or destroyed or damaged assets that could occur to a system, society, or a community in a specific period, determined probabilistically as a function of hazard, exposure, vulnerability, and capacity. It is an essential topic for communities, governments, and organizations aiming to reduce damage and save lives in the event of natural or human-made hazards.\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Disaster risk arises from the combination of various hazards (such as earthquakes, floods, or hurricanes) with the exposure and vulnerability of people and assets. A hazard alone doesn't cause a disaster\—it's the interaction with vulnerable systems that does. Therefore, understanding these interactions is key to disaster risk reduction.\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Reducing disaster risk involves proactive efforts such as planning, education, infrastructure improvements, and policy enforcement. It requires coordination between different sectors\—health, urban planning, education, and emergency services\—at local, national, and global levels.\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Education plays a crucial role in managing disaster risk. When individuals and communities are informed, they can prepare better, respond more effectively, and recover faster. Schools, media, and public campaigns are powerful tools for spreading awareness and building resilience.\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Finally, addressing disaster risk is not just a matter of emergency response; it's about long-term development and sustainability. By investing in risk reduction today, communities can save lives, protect economic development, and create safer, more resilient environments for future generations.\"}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null}},{\"bulletListBlock\":\"bulletList\",\"content\":[{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Hazard\"},{\"type\":\"text\",\"text\":\"\– A potentially damaging physical event or phenomenon (e.g., earthquake, storm).\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Exposure\"},{\"type\":\"text\",\"text\":\"\– The people, property, and systems that are in harm's way.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Vulnerability\"},{\"type\":\"text\",\"text\":\"\– The susceptibility of exposed elements to the impact of hazards.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Capacity\"},{\"type\":\"text\",\"text\":\"\– The strengths and resources available to reduce disaster risk.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Mitigation\"},{\"type\":\"text\",\"text\":\"\– Actions taken to minimize the impact of disasters before they happen.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Preparedness\"},{\"type\":\"text\",\"text\":\"\– Planning and organizing resources and activities to ensure an effective response.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Response\"},{\"type\":\"text\",\"text\":\"\– Immediate actions taken during and after a disaster to ensure safety and provide aid.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Recovery\"},{\"type\":\"text\",\"text\":\"\– Long-term restoration of services, infrastructure, and livelihoods after a disaster.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Resilience\"},{\"type\":\"text\",\"text\":\"\– The ability of communities to resist, absorb, and recover from disasters.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Risk Assessment\"},{\"type\":\"text\",\"text\":\"\– The process of identifying and analyzing potential hazards and risks.\"}]}]}]},{\"textType\":\"paragraph\",\"attrs\":{\"textAlign\":null}},{\"videoBlock\":\"youtube\",\"attrs\":{\"src\":\"https:\\/\\/www.youtube.com\\/embed\\/y16aMLeh91Q?rel=1\",\"start\":0,\"width\":640,\"height\":480}}]}",
            "files": []
        },
        {
            "id": 2,
            "coursed": 1,
            "oldOrderPosition": 0,
            "currentOrderPosition": 4,
            "LessonName": "Disaster Risk Lesson 2",
            "file_path": null,
            "created_at": "2025-05-09T09:30:03.000000Z",
            "updated_at": "2025-05-10T11:15:09.000000Z",
            "Lesson_Type": "Text",
            "LessonContentAsJSON":{
  "type": "doc",
  "content": [
    {
      "headerBlock": "heading",
      "attrs": {
        "textAlign": "center",
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "Understanding Disaster Risk"
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "center"
      }
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk refers to the potential loss of life, injury, or destroyed or damaged assets that could occur to a system, society, or a community in a specific period, determined probabilistically as a function of hazard, exposure, vulnerability, and capacity. It is an essential topic for communities, governments, and organizations aiming to reduce damage and save lives in the event of natural or human-made hazards."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk arises from the combination of various hazards (such as earthquakes, floods, or hurricanes) with the exposure and vulnerability of people and assets. A hazard alone doesn't cause a disaster—it's the interaction with vulnerable systems that does. Therefore, understanding these interactions is key to disaster risk reduction."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Reducing disaster risk involves proactive efforts such as planning, education, infrastructure improvements, and policy enforcement. It requires coordination between different sectors—health, urban planning, education, and emergency services—at local, national, and global levels."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Education plays a crucial role in managing disaster risk. When individuals and communities are informed, they can prepare better, respond more effectively, and recover faster. Schools, media, and public campaigns are powerful tools for spreading awareness and building resilience."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Finally, addressing disaster risk is not just a matter of emergency response; it's about long-term development and sustainability. By investing in risk reduction today, communities can save lives, protect economic development, and create safer, more resilient environments for future generations."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "bulletListBlock": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Hazard"
                },
                {
                  "type": "text",
                  "text": "– A potentially damaging physical event or phenomenon (e.g., earthquake, storm)."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Exposure"
                },
                {
                  "type": "text",
                  "text": "– The people, property, and systems that are in harm's way."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Vulnerability"
                },
                {
                  "type": "text",
                  "text": "– The susceptibility of exposed elements to the impact of hazards."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Capacity"
                },
                {
                  "type": "text",
                  "text": "– The strengths and resources available to reduce disaster risk."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Mitigation"
                },
                {
                  "type": "text",
                  "text": "– Actions taken to minimize the impact of disasters before they happen."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Preparedness"
                },
                {
                  "type": "text",
                  "text": "– Planning and organizing resources and activities to ensure an effective response."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Response"
                },
                {
                  "type": "text",
                  "text": "– Immediate actions taken during and after a disaster to ensure safety and provide aid."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Recovery"
                },
                {
                  "type": "text",
                  "text": "– Long-term restoration of services, infrastructure, and livelihoods after a disaster."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Resilience"
                },
                {
                  "type": "text",
                  "text": "– The ability of communities to resist, absorb, and recover from disasters."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Risk Assessment"
                },
                {
                  "type": "text",
                  "text": "– The process of identifying and analyzing potential hazards and risks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "videoBlock": "youtube",
      "attrs": {
        "src": "https://www.youtube.com/embed/y16aMLeh91Q?rel=1",
        "start": 0,
        "width": 640,
        "height": 480
      }
    }
  ]
},
            "files": []
        },
         {
            "id": 3,
            "coursed": 1,
            "oldOrderPosition": 0,
            "currentOrderPosition": 4,
            "LessonName": "Disaster Risk Lesson 2",
            "file_path": null,
            "created_at": "2025-05-09T09:30:03.000000Z",
            "updated_at": "2025-05-10T11:15:09.000000Z",
            "Lesson_Type": "Text",
            "LessonContentAsJSON":{
  "type": "doc",
  "content": [
    {
      "headerBlock": "heading",
      "attrs": {
        "textAlign": "center",
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "Understanding Disaster Risk"
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "center"
      }
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk refers to the potential loss of life, injury, or destroyed or damaged assets that could occur to a system, society, or a community in a specific period, determined probabilistically as a function of hazard, exposure, vulnerability, and capacity. It is an essential topic for communities, governments, and organizations aiming to reduce damage and save lives in the event of natural or human-made hazards."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk arises from the combination of various hazards (such as earthquakes, floods, or hurricanes) with the exposure and vulnerability of people and assets. A hazard alone doesn't cause a disaster—it's the interaction with vulnerable systems that does. Therefore, understanding these interactions is key to disaster risk reduction."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Reducing disaster risk involves proactive efforts such as planning, education, infrastructure improvements, and policy enforcement. It requires coordination between different sectors—health, urban planning, education, and emergency services—at local, national, and global levels."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Education plays a crucial role in managing disaster risk. When individuals and communities are informed, they can prepare better, respond more effectively, and recover faster. Schools, media, and public campaigns are powerful tools for spreading awareness and building resilience."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Finally, addressing disaster risk is not just a matter of emergency response; it's about long-term development and sustainability. By investing in risk reduction today, communities can save lives, protect economic development, and create safer, more resilient environments for future generations."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "bulletListBlock": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Hazard"
                },
                {
                  "type": "text",
                  "text": "– A potentially damaging physical event or phenomenon (e.g., earthquake, storm)."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Exposure"
                },
                {
                  "type": "text",
                  "text": "– The people, property, and systems that are in harm's way."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Vulnerability"
                },
                {
                  "type": "text",
                  "text": "– The susceptibility of exposed elements to the impact of hazards."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Capacity"
                },
                {
                  "type": "text",
                  "text": "– The strengths and resources available to reduce disaster risk."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Mitigation"
                },
                {
                  "type": "text",
                  "text": "– Actions taken to minimize the impact of disasters before they happen."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Preparedness"
                },
                {
                  "type": "text",
                  "text": "– Planning and organizing resources and activities to ensure an effective response."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Response"
                },
                {
                  "type": "text",
                  "text": "– Immediate actions taken during and after a disaster to ensure safety and provide aid."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Recovery"
                },
                {
                  "type": "text",
                  "text": "– Long-term restoration of services, infrastructure, and livelihoods after a disaster."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Resilience"
                },
                {
                  "type": "text",
                  "text": "– The ability of communities to resist, absorb, and recover from disasters."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Risk Assessment"
                },
                {
                  "type": "text",
                  "text": "– The process of identifying and analyzing potential hazards and risks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "videoBlock": "youtube",
      "attrs": {
        "src": "https://www.youtube.com/embed/y16aMLeh91Q?rel=1",
        "start": 0,
        "width": 640,
        "height": 480
      }
    }
  ]
},
            "files": []
        },
         {
            "id": 4,
            "coursed": 1,
            "oldOrderPosition": 0,
            "currentOrderPosition": 4,
            "LessonName": "Disaster Risk Lesson 2",
            "file_path": null,
            "created_at": "2025-05-09T09:30:03.000000Z",
            "updated_at": "2025-05-10T11:15:09.000000Z",
            "Lesson_Type": "Text",
            "LessonContentAsJSON":{
  "type": "doc",
  "content": [
    {
      "headerBlock": "heading",
      "attrs": {
        "textAlign": "center",
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "Understanding Disaster Risk"
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "center"
      }
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk refers to the potential loss of life, injury, or destroyed or damaged assets that could occur to a system, society, or a community in a specific period, determined probabilistically as a function of hazard, exposure, vulnerability, and capacity. It is an essential topic for communities, governments, and organizations aiming to reduce damage and save lives in the event of natural or human-made hazards."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Disaster risk arises from the combination of various hazards (such as earthquakes, floods, or hurricanes) with the exposure and vulnerability of people and assets. A hazard alone doesn't cause a disaster—it's the interaction with vulnerable systems that does. Therefore, understanding these interactions is key to disaster risk reduction."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Reducing disaster risk involves proactive efforts such as planning, education, infrastructure improvements, and policy enforcement. It requires coordination between different sectors—health, urban planning, education, and emergency services—at local, national, and global levels."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Education plays a crucial role in managing disaster risk. When individuals and communities are informed, they can prepare better, respond more effectively, and recover faster. Schools, media, and public campaigns are powerful tools for spreading awareness and building resilience."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      },
      "content": [
        {
          "type": "text",
          "text": "Finally, addressing disaster risk is not just a matter of emergency response; it's about long-term development and sustainability. By investing in risk reduction today, communities can save lives, protect economic development, and create safer, more resilient environments for future generations."
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "bulletListBlock": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Hazard"
                },
                {
                  "type": "text",
                  "text": "– A potentially damaging physical event or phenomenon (e.g., earthquake, storm)."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Exposure"
                },
                {
                  "type": "text",
                  "text": "– The people, property, and systems that are in harm's way."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Vulnerability"
                },
                {
                  "type": "text",
                  "text": "– The susceptibility of exposed elements to the impact of hazards."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Capacity"
                },
                {
                  "type": "text",
                  "text": "– The strengths and resources available to reduce disaster risk."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Mitigation"
                },
                {
                  "type": "text",
                  "text": "– Actions taken to minimize the impact of disasters before they happen."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Preparedness"
                },
                {
                  "type": "text",
                  "text": "– Planning and organizing resources and activities to ensure an effective response."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Response"
                },
                {
                  "type": "text",
                  "text": "– Immediate actions taken during and after a disaster to ensure safety and provide aid."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Recovery"
                },
                {
                  "type": "text",
                  "text": "– Long-term restoration of services, infrastructure, and livelihoods after a disaster."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Resilience"
                },
                {
                  "type": "text",
                  "text": "– The ability of communities to resist, absorb, and recover from disasters."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "textType": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ],
                  "text": "Risk Assessment"
                },
                {
                  "type": "text",
                  "text": "– The process of identifying and analyzing potential hazards and risks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "textType": "paragraph",
      "attrs": {
        "textAlign": null
      }
    },
    {
      "videoBlock": "youtube",
      "attrs": {
        "src": "https://www.youtube.com/embed/y16aMLeh91Q?rel=1",
        "start": 0,
        "width": 640,
        "height": 480
      }
    }
  ]
},
            "files": []
        }
    ]

    const [modules, setModules] = useState([]);
    const [learnerProgress, setLearnerProgress] = useState([])
    const [progress, setProgress] = useState()


    //Set Modules
    useEffect(()=>{
        const moduleIds = Lesson.map(l => l.id)
        setModules(moduleIds)
    },[Lesson])

    //New handleNext
    const completeModule = (moduleId) => {
        stepperRef.current?.next()
        setLearnerProgress(prev => {
            if(prev.includes(moduleId)) return prev
            return [...prev, moduleId]
        })
    }

    const calculateProgress = () => {
        const p = (learnerProgress.length / modules.length) * 100;
        setProgress(Math.round(p))
        console.log("Total Progress",progress)
    }

    useEffect(()=> {
        console.log("Learner Progress: ", learnerProgress)
        console.log("Module to be completed: ", modules)
        calculateProgress()
    },[learnerProgress])


    return (
        <>
        {
            user.user_infos.roles?.[0].role_name === "System Admin" ?
            <div className="grid grid-cols-[20rem_1fr] grid-rows-[min-content_auto] h-full ">

                {/* Course Content */}
                <div className="flex flex-col justify-center py-3 pr-2 border-r border-divider">
                    <h1 className="font-header text-primary text-lg">Module Contents</h1>
                    <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
                </div>
                <div className="col-start-1 col-span-2 row-start-2">
                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)}>
                {
                        Lesson.map((lesson, index) => {
                            let content;
                            switch (lesson.Lesson_Type) {
                            case "Text":
                                content = <Content  course={lesson.LessonContentAsJSON}/>;
                                break;
                            default:
                                content = (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="font-text text-primary text-sm">No Content Available</p>
                                </div>
                                );
                            }

                            return (
                            <Step key={index} stepTitle={lesson.LessonName} stepDesc={"Hello"}>
                                {content}
                            </Step>
                            );
                        })
                        }
                    {/* <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"}>
                        <CourseOverview/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 1"} stepDesc={"Course Content that is created from Comp-e-Learn Canvas"}>
                        <Content/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 2"} stepDesc={"Course Content that is created from Comp-e-Learn File Import (docx, and pdf)"}>
                        <CourseText/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 3"} stepDesc={"Course Content that is created from Comp-e-Learn MP4 import"}>
                        <CourseVideo/>
                    </Step> */}
                    <StepperCompleted>
                        <div className="w-full h-[calc(100vh-11.5rem)] flex flex-col items-center justify-center gap-y-3">
                                <img src={courseCompleted} alt="" className="w-40"/>
                            <div className="text-center">
                                <p className="font-header text-primary text-4xl">Congratulations</p>
                                <p className="font-text text-primary text-sm">"You have completed the given course"</p>
                            </div>
                        </div>
                    </StepperCompleted>
                </Stepper>
                </div>

                {/* Module Navigation */}
                <div className="flex flex-row justify-between items-center w-full py-1 pl-2">
                    <div className="group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out gap-2"
                        onClick={()=> stepperRef.current?.back()}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-primary group-hover:text-white"/>
                        <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
                    </div>
                    <div>
                        <p className="font-header text-primary">
                            {activeStepMeta?.title}
                        </p>
                    </div>
                    <div className="group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white hover:bg-primary transition-all ease-in-out gap-2 hover:cursor-pointer"
                        onClick={()=> stepperRef.current?.next()}>
                        <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
                        <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary group-hover:text-white"/>
                    </div>
                </div>
            </div>

            :
            // Learner
            <>
            <div className="flex flex-row items-center justify-between gap-4 border-b border-divider py-4">
                {headers}
            </div>
            <div className="flex flex-col justify-center py-3 pl-4 border-l border-divider row-span-1">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
            </div>

             {/* Module Navigation */}
            <div className="flex flex-row justify-between items-center w-full py-1 pl-2 pr-5">
                    <div className="group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out gap-2"
                        onClick={()=> stepperRef.current?.back()}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-primary group-hover:text-white"/>
                        <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
                    </div>
                    <div>
                        <p className="font-header text-primary">
                            {activeStepMeta?.title}
                        </p>
                    </div>
                    <div className="group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white hover:bg-primary transition-all ease-in-out gap-2 hover:cursor-pointer"
                        onClick={()=>{
                                    completeModule(activeStepMeta?.stepID)
                                }
                                // stepperRef.current?.next()
                            }>
                        <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
                        <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary group-hover:text-white"/>
                    </div>
            </div>

            {/* Course Progress */}
            <div className="pl-4 pr-3 py-2 border-l border-divider flex flex-col gap-y-2 justify-center">
                <div className="flex flex-row justify-between font-text text-sm text-unactive">
                    <p>Progress:</p>
                    <p>{progress || 0}%</p>
                </div>
                <div>
                    <Progress value={progress || 0}/>
                </div>
            </div>

            {/* Modules */}
            <div className="col-start-1 col-span-2 row-start-3 row-span-2 border-divider">
                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)}>
                    {
                        Lesson.map((lesson, index) => {
                            let content;

                            switch (lesson.Lesson_Type) {
                            case "Text":
                                content = <Content  course={lesson.LessonContentAsJSON}/>;
                                break;
                            default:
                                content = (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="font-text text-primary text-sm">No Content Available</p>
                                </div>
                                );
                            }

                            return (
                            <Step key={index} stepTitle={lesson.LessonName} stepDesc={"Hello"} stepID={lesson.id}>
                                {content}
                            </Step>
                            );
                        })
                        }










                    {/* <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"}>
                        <CourseOverview/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 1"} stepDesc={"Course Content that is created from Comp-e-Learn Canvas"}>
                        <Content/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 2"} stepDesc={"Course Content that is created from Comp-e-Learn File Import (docx, and pdf)"}>
                        <CourseText/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 3"} stepDesc={"Course Content that is created from Comp-e-Learn MP4 import"}>
                        <CourseVideo/>
                    </Step> */}
                    <StepperCompleted>
                        <div className="w-full h-[calc(100vh-11.5rem)] flex flex-col items-center justify-center gap-y-3">
                                <img src={courseCompleted} alt="" className="w-40"/>
                            <div className="text-center">
                                <p className="font-header text-primary text-4xl">Congratulations</p>
                                <p className="font-text text-primary text-sm">"You have completed the given course"</p>
                            </div>
                        </div>
                    </StepperCompleted>
                </Stepper>
            </div>
            </>
        }
  </>

    );
};

export default CourseModuleProps;
