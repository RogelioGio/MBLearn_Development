
const course =
{
    "type": "doc",
    "content": [
      {
        "textblock": "heading",
        "level": 1,
        "textblockcontent": [
          {
            "type": "text",
            "text": "Introduction to Programming"
          }
        ]
      },
      {
        "textblock": "paragraph",
        "textblockcontent": []
      },
      {
        "textblock": "paragraph",
        "textblockcontent": [
          {
            "type": "text",
            "text": "You should learn to code like a pro, because in today's fast-paced digital world, programming has become one of the most valuable skills you can have. Whether you're looking to build your own projects, advance in your career, or bring creative ideas to life, mastering coding opens up endless opportunities. The ability to code is no longer just for computer scientists or tech enthusiasts—it’s a skill that is in demand across virtually every industry. From healthcare to finance, entertainment to education, companies are looking for individuals who can not only understand technology but also harness its power to solve real-world problems."
          }
        ]
      },
      {
        "textblock": "paragraph",
        "textblockcontent": [
          {
            "type": "text",
            "text": "With the right tools, resources, and mindset, anyone can unlock their potential and become proficient in coding. The beauty of coding is that it encourages creativity, problem-solving, and critical thinking, which are valuable traits no matter your profession. Whether you dream of launching a startup, automating your daily tasks, or building a game or mobile app, learning to code equips you with the foundation to turn those dreams into reality."
          }
        ]
      },
      {
        "textblock": "paragraph",
        "textblockcontent": [
          {
            "type": "text",
            "text": "In this digital age, the demand for skilled programmers continues to rise, and having the ability to write clean, efficient code will set you apart from the crowd. But becoming a pro takes more than just knowing the syntax—it requires understanding how to think like a programmer, tackle complex problems, and collaborate with others. Whether you're starting from scratch or looking to sharpen your skills, there are countless resources, communities, and tools available to help you along the way."
          }
        ]
      },
      {
        "textblock": "paragraph",
        "textblockcontent": [
          {
            "type": "text",
            "text": "Let’s explore how you can embark on this exciting journey and master the art of coding step by step."
          }
        ]
      },
      {
        "textblock": "paragraph",
        "textblockcontent": []
      },
      {
        "textblock": "paragraph",
        "textblockcontent": []
      },
      {
        "videoblock": "youtube",
        "attrs": {
          "src": "https://www.youtube.com/embed/sqEdkBYmqQE?rel=1",
          "start": 0,
          "width": 640,
          "height": 480
        }
      },
      {
        "referenceBlock": "paragraph",
        "referenceBlockcontent": [
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.wikipedia.org/",
                  "target": "_blank",
                  "rel": "noopener noreferrer nofollow",
                  "class": null
                }
              }
            ],
            "text": "https://www.wikipedia.org/"
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.wikipedia.org/",
                  "target": "_blank",
                  "rel": "noopener noreferrer nofollow",
                  "class": null
                }
              }
            ],
            "text": "https://www.wikipedia.org/"
          }
        ]
      },
      {
        "bulletListBlock": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "asdasd"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "asdasd"
                  }
                ]
              }
            ]
          }
        ]
      },

      {
        "orderListBlock": "orderedList",
        "attrs": {
          "start": 1,
          "type": null
        },
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "asdasd"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "asdasd"
                  }
                ]
              }
            ]
          }
        ]
      },
    ]

  }




const Content = () => {

    //Rendering text with stytles
    const renderText = (textObject, index) => {
        let element = <span key={index}>{textObject.text}</span>;

        if(textObject.marks) {
            textObject.marks.forEach(mark => {
                switch(mark.type) {
                    case "bold":
                        element = <strong className="font-header text-xs" key={index}>{element}</strong>;
                        break;
                    case "italic":
                        element = <em key={index}>{element}</em>;
                        break;
                    case "strike":
                        element = <s key={index}>{element}</s>;
                        break;
                    default:
                        break;
                }
            });
        } else {
        <span key={index}>{textObject.text}</span>;
        }
        return element;
    }


    return(
        //content helper
        <>
            {course.content.map((content, index) => {
                //text
                if(content.textblock) {
                    switch(content.textblock) {
                        case "paragraph":
                            //
                            return (
                                <p key={index} className="text-sm font-text py-1">
                                    {content.textblockcontent?.map((text, index) =>
                                        renderText(text, index)
                                    )}
                                </p>
                            );
                        case "heading":
                            switch(content.level) {
                                case 1:
                                    return (
                                        <h1 key={index} className="text-3xl font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h1>
                                    );
                                case 2:
                                    return (
                                        <h2 key={index} className="text-2xl font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h2>
                                    )
                                case 3:
                                    return (
                                        <h3 key={index} className="text-xl font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h3>
                                    )
                                case 4:
                                    return (
                                        <h4 key={index} className="text-lg font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h4>
                                    )
                                case 5:
                                    return (
                                        <h5 key={index} className="text-base font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h5>
                                    )
                                case 6:
                                    return (
                                        <h6 key={index} className="text-sm font-header py-1 text-primary">
                                            {content.textblockcontent.map((text, index) => (
                                                <span key={index}>{text.text}</span>
                                            ))}
                                        </h6>
                                    )

                            }
                        default:
                            return null;
                    }
                } else if(content.videoblock) {
                    return (
                    <iframe class="w-full aspect-video rounded-lg"
                        src={content.attrs?.src}
                        title="Understanding Direct Taxes"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                    )
                } else if(content.referenceBlock){
                    return (
                        <>
                        <div className="mx-5 py-5">
                            <div className="border-divider border-b py-1">
                                <p className="font-header text-sm text-primary">Reference Link</p>
                            </div>
                            <div className="py-1">
                                {
                                    content.referenceBlockcontent.map((reference, _)=>{
                                        return (
                                            <a
                                            key={_}
                                            href={reference.marks[0].attrs.href}
                                            target={reference.marks[0].attrs.target}
                                            rel={reference.marks[0].attrs.rel}
                                            className="hover:cursor-pointer hover:text-primary"
                                            >
                                            <span className="font-text text-sm">
                                                {reference.text}
                                            </span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        </>
                    )
                } else if (content.bulletListBlock){
                    return (
                        <ul className="list-disc pl-5">
                        {content.content.map((bulletItem, i) => (
                            <li key={i} className="font-text text-sm">
                            {bulletItem.content.map((item, j) =>
                                item.content.map((c, k) => (
                                    renderText(c, `${i}-${j}-${k}`)
                                ))
                            )}
                            </li>
                        ))}
                        </ul>
                    )


                } else if (content.orderListBlock) {
                    return (
                        <ol className="list-decimal pl-5">
                        {content.content.map((orderedItem, i) => (
                            <li key={i} className="font-text text-sm">
                            {orderedItem.content.map((item, j) =>
                                item.content.map((c, k) => (
                                    renderText(c, `${i}-${j}-${k}`)
                                ))
                            )}
                            </li>
                        ))}
                        </ol>
                    )
                }
                else {
                    return null;
                }
            })}
        </>
    )
}
export default Content;
