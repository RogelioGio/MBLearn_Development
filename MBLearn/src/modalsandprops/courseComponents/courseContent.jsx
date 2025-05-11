import { useState } from "react";

// const course =
// {
//     "type": "doc",
//     "content": [
//       {
//         "headerBlock": "heading",
//         "attrs": {
//           "textAlign": "center",
//           "level": 1
//         },
//         "content": [
//           {
//             "type": "text",
//             "marks": [
//               {
//                 "type": "textStyle",
//                 "attrs": {
//                   "fontFamily": "Georgia, serif"
//                 }
//               }
//             ],
//             "text": "Benefits of Exercising Regularly"
//           }
//         ]
//       },
//       {
//         "textBlock": "paragraph",
//         "content": [
//           {
//             "marks": [
//                 { "type": "bold" },
//                 { "type": "italic" },
//                 { "type": "strike" }
//               ],
//             "type": "text",
//             "text": "Exercising regularly offers a wide range of benefits that contribute to both physical and"
//           },
//           {
//             "marks": [
//                 { "type": "italic" },
//               ],
//             "type": "text",
//             "text": " to both physical and mental well-being. From improving cardiovascular health and building stronger muscles to enhancing mood and reducing stress, consistent physical activity plays a vital role in maintaining a healthy lifestyle. It not only helps in managing weight but also boosts energy levels, strengthens the immune system, and lowers the risk of chronic diseases such as diabetes and hypertension. With these advantages, incorporating exercise into daily routines becomes an essential step toward a longer, healthier, and more fulfilling life."
//           }
//         ]
//       },
//       {
//         "bulletListBlock": "bulletList",
//         "content": [
//           {
//             "type": "listItem",
//             "content": [
//               {
//                 "textType": "paragraph",
//                 "attrs": {
//                   "textAlign": null
//                 },
//                 "content": [
//                   {
//                     "type": "text",
//                     "marks": [
//                       {
//                         "type": "textStyle",
//                         "attrs": {
//                           "fontFamily": "Arial, sans-serif"
//                         }
//                       }
//                     ],
//                     "text": "Increases physical strength and endurance"
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             "type": "listItem",
//             "content": [
//               {
//                 "textType": "paragraph",
//                 "attrs": {
//                   "textAlign": null
//                 },
//                 "content": [
//                   {
//                     "type": "text",
//                     "marks": [
//                       {
//                         "type": "textStyle",
//                         "attrs": {
//                           "fontFamily": "Arial, sans-serif"
//                         }
//                       }
//                     ],
//                     "text": "Improves mental health and reduces stress"
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             "type": "listItem",
//             "content": [
//               {
//                 "textType": "paragraph",
//                 "attrs": {
//                   "textAlign": null
//                 },
//                 "content": [
//                   {
//                     "type": "text",
//                     "marks": [
//                       {
//                         "type": "textStyle",
//                         "attrs": {
//                           "fontFamily": "Arial, sans-serif"
//                         }
//                       }
//                     ],
//                     "text": "Boosts overall longevity and reduces the risk of chronic diseases"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         }
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "Regular exercise plays a crucial role in maintaining a healthy lifestyle. It not only helps in building physical strength but also boosts mental well-being. Engaging in consistent physical activity has been shown to increase endurance and overall energy levels, making daily tasks feel less taxing. Moreover, exercise promotes the release of endorphins, which can help reduce feelings of anxiety and stress, leading to a more positive outlook on life. Over time, maintaining an active routine can also reduce the risk of developing serious health conditions such as heart disease, diabetes, and obesity, thereby increasing the chances of living a longer, healthier life."
//           }
//         ]
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         }
//       },
//       {
//         "blockQuoteBlock": "blockquote",
//         "content": [
//           {
//             "textType": "paragraph",
//             "attrs": {
//               "textAlign": null
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "\"Exercise is the most potent medicine available for preventing and treating chronic disease.\""
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         }
//       },
//       {
//         "videoBlock": "youtube",
//         "attrs": {
//           "src": "https://www.youtube.com/embed/AdqrTg_hpEQ?rel=1",
//           "start": 0,
//           "width": 640,
//           "height": 480
//         }
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         }
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "In order to Learn the Fundamentals of Exercising, visit the link below:"
//           }
//         ]
//       },
//       {
//         "linkType": "link",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "marks": [
//               {
//                 "type": "link",
//                 "attrs": {
//                   "href": "https://en.wikipedia.org/wiki/Exercise",
//                   "target": "_blank",
//                   "rel": "noopener noreferrer nofollow",
//                   "class": null
//                 }
//               }
//             ],
//             "text": "https://en.wikipedia.org/wiki/Exercise"
//           }
//         ]
//       },
//       {
//         "textType": "paragraph",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "A Very Good Reference To Visit"
//           }
//         ]
//       }
//     ]
//   }
// {
//     "type": "doc",
//     "content": [
//         {
//             "headerBlock": "heading",
//             "attrs": {
//               "level": 1
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "Introduction to Programming"
//               }
//             ]
//           },
//           {
//             "textBlock": "paragraph",
//             "content": [
//               {
//                 "type": "text",
//                 "text": "You should learn to code like a pro, because in today's fast-paced digital world, programming has become one of the most valuable skills you can have. Whether you're looking to build your own projects, advance in your career, or bring creative ideas to life, mastering coding opens up endless opportunities. The ability to code is no longer just for computer scientists or tech enthusiasts—it’s a skill that is in demand across virtually every industry. From healthcare to finance, entertainment to education, companies are looking for individuals who can not only understand technology but also harness its power to solve real-world problems."
//               }
//             ]
//           },
//           {
//             "textBlock": "paragraph",
//             "content": [
//               {
//                 "type": "text",
//                 "text": "With the right tools, resources, and mindset, anyone can unlock their potential and become proficient in coding. The beauty of coding is that it encourages creativity, problem-solving, and critical thinking, which are valuable traits no matter your profession. Whether you dream of launching a startup, automating your daily tasks, or building a game or mobile app, learning to code equips you with the foundation to turn those dreams into reality."
//               }
//             ]
//           },
//           {
//             "textBlock": "paragraph",
//             "content": [
//               {
//                 "type": "text",
//                 "text": "In this digital age, the demand for skilled programmers continues to rise, and having the ability to write clean, efficient code will set you apart from the crowd. But becoming a pro takes more than just knowing the syntax—it requires understanding how to think like a programmer, tackle complex problems, and collaborate with others. Whether you're starting from scratch or looking to sharpen your skills, there are countless resources, communities, and tools available to help you along the way."
//               }
//             ]
//           },
//           {
//             "textBlock": "paragraph",
//             "content": [
//               {
//                 "type": "text",
//                 "text": "Let’s explore how you can embark on this exciting journey and master the art of coding step by step."
//               },
//             ]
//           },
//       {
//         "videoblock": "youtube",
//         "attrs": {
//           "src": "https://www.youtube.com/embed/sqEdkBYmqQE?rel=1",
//           "start": 0,
//           "width": 640,
//           "height": 480
//         }
//       },
//       {
//         "blockQuoteBlock": "blockquote",
//         "content": [
//           {
//             "textType": "paragraph",
//             "attrs": {
//               "textAlign": null
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "This is a Blockquote"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "blockQuoteBlock": "blockquote",
//         "content": [
//           {
//             "textType": "paragraph",
//             "attrs": {
//               "textAlign": null
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "This is a Blockquote"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "linkType": "link",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "marks": [
//               {
//                 "type": "link",
//                 "attrs": {
//                   "href": "https://en.wikipedia.org/wiki/Exercise",
//                   "target": "_blank",
//                   "rel": "noopener noreferrer nofollow",
//                   "class": null
//                 }
//               }
//             ],
//             "text": "https://en.wikipedia.org/wiki/Exercise"
//           }
//         ]
//       },
//       {
//         "linkType": "link",
//         "attrs": {
//           "textAlign": null
//         },
//         "content": [
//           {
//             "type": "text",
//             "marks": [
//               {
//                 "type": "link",
//                 "attrs": {
//                   "href": "https://en.wikipedia.org/wiki/Exercise",
//                   "target": "_blank",
//                   "rel": "noopener noreferrer nofollow",
//                   "class": null
//                 }
//               }
//             ],
//             "text": "https://en.wikipedia.org/wiki/Exercise"
//           }
//         ]
//       },

//       {

//         "bulletListBlock": "bulletList",
//         "content": [
//             {
//             "type": "listItem",
//             "content": [
//                 {
//                 "textType": "paragraph",
//                 "attrs": {
//                     "textAlign": null
//                 },
//                 "content": [
//                     {
//                     "type": "text",
//                     "text": "1st Bullet"
//                     }
//                 ]
//                 }
//             ]
//             },
//             {
//             "type": "listItem",
//             "content": [
//                 {
//                 "textType": "paragraph",
//                 "attrs": {
//                     "textAlign": null
//                 },
//                 "content": [
//                     {
//                     "type": "text",
//                     "text": "2nd Bullet"
//                     }
//                 ]
//                 }
//             ]
//             }
//         ]

//       },

//       {

//         "orderListBlock": "orderedList",
//         "attrs": {
//             "start": 1,
//             "type": null
//         },
//         "content": [
//             {
//             "type": "listItem",
//             "content": [
//                 {
//                 "textType": "paragraph",
//                 "attrs": {
//                     "textAlign": null
//                 },
//                 "content": [
//                     {
//                     "type": "text",
//                     "text": "1st Order"
//                     }
//                 ]
//                 }
//             ]
//             },
//             {
//             "type": "listItem",
//             "content": [
//                 {
//                 "textType": "paragraph",
//                 "attrs": {
//                     "textAlign": null
//                 },
//                 "content": [
//                     {
//                     "type": "text",
//                     "text": "2nd Order"
//                     }
//                 ]
//                 }
//             ]
//             }
//         ]


//       },

//       {
//         "textBlock": "paragraph",
//         "attrs": {
//           "textAlign": "left"
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "This is Left Aligned"
//           }
//         ]
//       },
//       {
//         "textBlock": "paragraph",
//         "attrs": {
//           "textAlign": "center"
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "This is Center Aligned"
//           }
//         ]
//       },
//       {
//         "textBlock": "paragraph",
//         "attrs": {
//           "textAlign": "right"
//         },
//         "content": [
//           {
//             "type": "text",
//             "text": "This is Right Aligned"
//           }
//         ]
//       }



//     ]

//   }




const Content = ({course}) => {

    //Rendering text with stytles
    const renderText = (textObject, index) => {
        let element = <span key={index}>{textObject.text}</span>;

        if(textObject.marks) {
            textObject.marks.slice().reverse().forEach(mark => {
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
            {
                (()=>{
                    const renderedContent = []
                    let perBlockRef = []
                    let perBlockQuote = []

                    course?.content.forEach((content, index)=>{

                        if(content.blockQuoteBlock) {
                            perBlockQuote.push(
                                <p>
                                {content.content.map((block, blockindex) => {
                                    return block.content.map((text, textindex) => {
                                        return renderText(text,  `${index}-${blockindex}-${textindex}`);
                                    });
                                })}
                                </p>
                            )
                        } else {
                            if (perBlockQuote.length > 0 ) {
                                renderedContent.push(
                                    <blockquote key={`quote-${index}`} className="border-l-4 border-primary pl-4 italic text-sm font-text bg-white p-4 my-4">
                                        {perBlockQuote}
                                    </blockquote>

                                )
                            };
                            perBlockQuote = []
                        }


                        if (content.linkType) {
                            content.content.forEach((ref, refIndex) => {
                                perBlockRef.push(
                                    <p key={refIndex} className="font-text text-sm py-1 hover:cursor-pointer hover:text-primary">
                                        <a href={ref.text} target="_blank" rel="noopener noreferrer">
                                            {ref.text}
                                        </a>
                                    </p>
                                );
                            });
                        } else {
                            if (perBlockRef.length > 0) {
                                renderedContent.push(
                                    <div className="mx-5 py-5" key={`ref-${index}`}>
                                        <div className="border-divider border-b py-1">
                                            <p className="font-header text-sm text-primary">Reference Link</p>
                                        </div>
                                        {perBlockRef}
                                    </div>
                                );
                            }
                            perBlockRef = [];
                        }

                        if(content.textBlock){

                            const align = content.attrs?.textAlign
                                ? `text-${content.attrs.textAlign}`
                                : 'text-left'

                            renderedContent.push(
                                <p key={index} className={`text-sm font-text py-1 ${align}`}>
                                    {content.content?.map((text, textIndex) => renderText(text, `${index}-${textIndex}`))}
                                </p>
                            )
                        } else if(content.headerBlock){
                            const level = content.attrs?.level || 1;
                            const alignClass = content.attrs?.textAlign
                                ? `text-${content.attrs.textAlign}`
                                : 'text-left'; // fallback to left

                            const headerContent = content.content.map((text, textIndex) => (
                                renderText(text, `${index}-${textIndex}`)
                            ));

                            const commonProps = {
                                key: index,
                                className: `font-header py-1 text-primary ${alignClass}`
                            };

                            switch (level) {
                                case 1:
                                    renderedContent.push(<h1 {...commonProps} className={`text-3xl py-5 ${commonProps.className}`}>{headerContent}</h1>);
                                    break;
                                case 2:
                                    renderedContent.push(<h2 {...commonProps} className={`text-2xl py-4 ${commonProps.className}`}>{headerContent}</h2>);
                                    break;
                                case 3:
                                    renderedContent.push(<h3 {...commonProps} className={`text-xl py-3 ${commonProps.className}`}>{headerContent}</h3>);
                                    break;
                                case 4:
                                    renderedContent.push(<h4 {...commonProps} className={`text-lg py-2 ${commonProps.className}`}>{headerContent}</h4>);
                                    break;
                                case 5:
                                    renderedContent.push(<h5 {...commonProps} className={`text-base py-1 ${commonProps.className}`}>{headerContent}</h5>);
                                    break;
                                case 6:
                                    renderedContent.push(<h6 {...commonProps} className={`text-sm ${commonProps.className}`}>{headerContent}</h6>);
                                    break;
                                default:
                                    break;
                            }
                        } else if(content.videoBlock){
                            renderedContent.push(
                                <div className="py-2" key={index}>
                                    <iframe
                                        className="w-full aspect-video rounded-lg"
                                        src={content.attrs?.src}
                                        title="null"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )
                        } else if(content.bulletListBlock){
                            const align = content.attrs?.textAlign
                            ? `text-${content.attrs.textAlign}`
                            : 'text-left'

                            renderedContent.push(
                                <ul className={`list-disc pl-5 py-4 ${align}`} key={index}>
                                    {content.content.map((bulletItem, i) => (
                                        <li key={i} className="font-text text-sm">
                                            {bulletItem.content.map((item, j) =>
                                                item.content.map((c, k) => renderText(c, `${i}-${j}-${k}`))
                                            )}
                                        </li>
                                    ))}
                                </ul>

                            )
                        } else if(content.orderListBlock){
                            const align = content.attrs?.textAlign
                            ? `text-${content.attrs.textAlign}`
                            : 'text-left'

                            renderedContent.push(
                                <ol className={`list-decimal pl-5 py-4 ${align}`} key={index}>
                                    {content.content.map((orderedItem, i) => (
                                        <li key={i} className="font-text text-sm">
                                            {orderedItem.content.map((item, j) =>
                                                item.content.map((c, k) => renderText(c, `${i}-${j}-${k}`))
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            )
                        }


                    })

                    return renderedContent
                })()

            }
        </>
    )
}
export default Content;
