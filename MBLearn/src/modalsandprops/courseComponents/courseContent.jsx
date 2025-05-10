import { useState } from "react";

const course =
{
    "type": "doc",
    "content": [
        {
            "headerBlock": "heading",
            "attrs": {
              "level": 1
            },
            "content": [
              {
                "type": "text",
                "text": "Introduction to Programming"
              }
            ]
          },
          {
            "textBlock": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "You should learn to code like a pro, because in today's fast-paced digital world, programming has become one of the most valuable skills you can have. Whether you're looking to build your own projects, advance in your career, or bring creative ideas to life, mastering coding opens up endless opportunities. The ability to code is no longer just for computer scientists or tech enthusiasts—it’s a skill that is in demand across virtually every industry. From healthcare to finance, entertainment to education, companies are looking for individuals who can not only understand technology but also harness its power to solve real-world problems."
              }
            ]
          },
          {
            "textBlock": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "With the right tools, resources, and mindset, anyone can unlock their potential and become proficient in coding. The beauty of coding is that it encourages creativity, problem-solving, and critical thinking, which are valuable traits no matter your profession. Whether you dream of launching a startup, automating your daily tasks, or building a game or mobile app, learning to code equips you with the foundation to turn those dreams into reality."
              }
            ]
          },
          {
            "textBlock": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "In this digital age, the demand for skilled programmers continues to rise, and having the ability to write clean, efficient code will set you apart from the crowd. But becoming a pro takes more than just knowing the syntax—it requires understanding how to think like a programmer, tackle complex problems, and collaborate with others. Whether you're starting from scratch or looking to sharpen your skills, there are countless resources, communities, and tools available to help you along the way."
              }
            ]
          },
          {
            "textBlock": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "Let’s explore how you can embark on this exciting journey and master the art of coding step by step."
              },
            ]
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
        "blockQuoteBlock": "blockquote",
        "content": [
          {
            "textType": "paragraph",
            "attrs": {
              "textAlign": null
            },
            "content": [
              {
                "type": "text",
                "text": "This is a Blockquote"
              }
            ]
          }
        ]
      },
      {
        "blockQuoteBlock": "blockquote",
        "content": [
          {
            "textType": "paragraph",
            "attrs": {
              "textAlign": null
            },
            "content": [
              {
                "type": "text",
                "text": "This is a Blockquote"
              }
            ]
          }
        ]
      },
      {
        "linkType": "link",
        "attrs": {
          "textAlign": null
        },
        "content": [
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://en.wikipedia.org/wiki/Exercise",
                  "target": "_blank",
                  "rel": "noopener noreferrer nofollow",
                  "class": null
                }
              }
            ],
            "text": "https://en.wikipedia.org/wiki/Exercise"
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
                "textType": "paragraph",
                "attrs": {
                    "textAlign": null
                },
                "content": [
                    {
                    "type": "text",
                    "text": "1st Bullet"
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
                    "text": "2nd Bullet"
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
                "textType": "paragraph",
                "attrs": {
                    "textAlign": null
                },
                "content": [
                    {
                    "type": "text",
                    "text": "1st Order"
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
                    "text": "2nd Order"
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

    //list All content to be rendered
    const renderedContent = []

    return(
        //content helper
        <>
            {/* {course.content.map((content, index) => {
                //text\
                if(content.textBlock) {
                    return (
                        <p key={index} className="text-sm font-text py-1">
                            {content.content?.map((text, index) =>
                                renderText(text, index)
                            )}
                        </p>
                    )
                } else if(content.headerBlock){
                    switch(content.attrs.level) {
                        case 1:
                            return (
                                <h1 key={index} className="text-3xl font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h1>
                            );
                        case 2:
                            return (
                                <h2 key={index} className="text-2xl font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h2>
                            )
                        case 3:
                            return (
                                <h3 key={index} className="text-xl font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h3>
                            )
                        case 4:
                            return (
                                <h4 key={index} className="text-lg font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h4>
                            )
                        case 5:
                            return (
                                <h5 key={index} className="text-base font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h5>
                            )
                        case 6:
                            return (
                                <h6 key={index} className="text-sm font-header py-1 text-primary">
                                    {content.content.map((text, index) => (
                                        <span key={index}>{text.text}</span>
                                    ))}
                                </h6>
                            )
                        }
                } else if(content.videoblock) {
                    return (
                        <div className="py-2">
                            <iframe className="w-full aspect-video rounded-lg"
                            src={content.attrs?.src}
                            title="Understanding Direct Taxes"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                            </iframe>
                        </div>
                    )
                } else if(content.linkType){
                        return (
                            <>
                            <div className="mx-5 py-5">
                                <div className="border-divider border-b py-1">
                                    <p className="font-header text-sm text-primary">Reference Link</p>
                                </div>
                                <div className="py-1">

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
                } else if (content.blockQuoteBlock) {
                    return (
                        <div className="mx-5 py-2">
                            <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-sm font-text bg-white">
                                {content.content.map((block, index) => {
                                    return block.content.map((text, index) => {
                                        return renderText(text, index);
                                    });
                                })}
                            </blockquote>
                        </div>
                    )
                }
                else {
                    return null;
                }
            })} */}
            {
                (()=>{
                    const renderedContent = []
                    let perBlockRef = []
                    let perBlockQuote = []

                    course.content.forEach((content, index)=>{
                        if(content.blockQuoteBlock) {
                            renderedContent.push(
                                <div className="mx-5 py-2">
                                    <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 italic text-sm font-text bg-white">
                                        {/* {content.content.map((block, blockindex) => {
                                            return block.content.map((text, textindex) => {
                                                return renderText(text,  `${index}-${blockIndex}-${textIndex}`);
                                            });
                                        })} */}
                                        Hello
                                    </blockquote>
                                </div>
                            )
                        } else {
                            if ()
                        }
                    })

                    return renderedContent
                })()

            }
        </>
    )
}
export default Content;
