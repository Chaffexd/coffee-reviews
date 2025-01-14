import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Home Page", () => {
  it("Renders the home page", () => {
    const mockLandingPageProps = {
      metadata: {
        tags: [],
        concepts: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "a3pray39687x",
          },
        },
        type: "Entry",
        id: "6A2NHykvpcafas2IS5jaao",
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "page",
          },
        },
        revision: 3,
        createdAt: "2024-12-22T11:19:14.358Z",
        updatedAt: "2024-12-27T16:32:56.269Z",
        publishedAt: "2024-12-27T16:32:56.269Z",
        firstPublishedAt: "2024-12-24T15:29:49.011Z",
        publishedVersion: 41,
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        locale: "en-GB",
      },
      fields: {
        landingPageTitle: "The Coffee Review",
        seoMetadata: {
          metadata: {
            tags: [],
            concepts: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "a3pray39687x",
              },
            },
            type: "Entry",
            id: "1AeTP1ljeKQXLbOTlC3xAL",
            contentType: {
              sys: {
                type: "Link",
                linkType: "ContentType",
                id: "seoMetadata",
              },
            },
            revision: 1,
            createdAt: "2024-12-26T18:17:46.917Z",
            updatedAt: "2024-12-26T18:18:32.375Z",
            publishedAt: "2024-12-26T18:18:32.375Z",
            firstPublishedAt: "2024-12-26T18:18:32.375Z",
            publishedVersion: 5,
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            locale: "en-GB",
          },
          fields: {
            title: "The Coffee Review",
            description:
              "A website dedicated to nothing but unbiased reviews on cafes and the coffee they deliver to the general public",
            image: {
              metadata: {
                tags: [],
                concepts: [],
              },
              sys: {
                space: {
                  sys: {
                    type: "Link",
                    linkType: "Space",
                    id: "a3pray39687x",
                  },
                },
                type: "Entry",
                id: "2sy3OMv9ljDbIFheTSZBG3",
                contentType: {
                  sys: {
                    type: "Link",
                    linkType: "ContentType",
                    id: "image",
                  },
                },
                revision: 1,
                createdAt: "2024-12-22T11:21:44.479Z",
                updatedAt: "2024-12-24T15:29:59.655Z",
                publishedAt: "2024-12-24T15:29:59.655Z",
                firstPublishedAt: "2024-12-24T15:29:59.655Z",
                publishedVersion: 2,
                environment: {
                  sys: {
                    id: "master",
                    type: "Link",
                    linkType: "Environment",
                  },
                },
                locale: "en-GB",
              },
              fields: {
                imageTitle: "Coffee Roasting",
                image: {
                  metadata: {
                    tags: [],
                    concepts: [],
                  },
                  sys: {
                    space: {
                      sys: {
                        type: "Link",
                        linkType: "Space",
                        id: "a3pray39687x",
                      },
                    },
                    type: "Asset",
                    id: "4YnwdmZcaf10Ndxpss3Z9M",
                    revision: 2,
                    createdAt: "2024-12-22T11:22:27.815Z",
                    updatedAt: "2024-12-24T15:29:59.574Z",
                    publishedAt: "2024-12-24T15:29:59.574Z",
                    firstPublishedAt: "2024-12-22T11:22:50.992Z",
                    publishedVersion: 7,
                    environment: {
                      sys: {
                        id: "master",
                        type: "Link",
                        linkType: "Environment",
                      },
                    },
                    locale: "en-GB",
                  },
                  fields: {
                    title: "Coffee Roasting",
                    description: "An image of beans being roasted",
                    file: {
                      url: "//images.ctfassets.net/a3pray39687x/4YnwdmZcaf10Ndxpss3Z9M/fed2459e8bab338405ff3a3d82cd2869/pexels-juanpphotoandvideo-894695.jpg",
                      details: {
                        size: 1976807,
                        image: {
                          width: 5472,
                          height: 3648,
                        },
                      },
                      fileName: "pexels-juanpphotoandvideo-894695.jpg",
                      contentType: "image/jpeg",
                    },
                  },
                },
              },
            },
            keywords: ["Coffee", "Artisan Coffee", "Barista", "Brew", "Travel"],
          },
        },
        slug: "/",
        carousel: [
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "6LYHc8QiA8LG9Lz1lrlSDE",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "image",
                },
              },
              revision: 1,
              createdAt: "2024-12-22T11:20:31.812Z",
              updatedAt: "2024-12-24T15:29:59.621Z",
              publishedAt: "2024-12-24T15:29:59.621Z",
              firstPublishedAt: "2024-12-24T15:29:59.621Z",
              publishedVersion: 3,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              imageTitle: "Latte Art Image",
              image: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Asset",
                  id: "6p49sTqdqtvtUCIZOH406C",
                  revision: 2,
                  createdAt: "2024-12-22T11:20:41.350Z",
                  updatedAt: "2024-12-24T15:29:59.565Z",
                  publishedAt: "2024-12-24T15:29:59.565Z",
                  firstPublishedAt: "2024-12-22T11:21:03.129Z",
                  publishedVersion: 7,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Latte art image",
                  description: "This is an image of latte art",
                  file: {
                    url: "//images.ctfassets.net/a3pray39687x/6p49sTqdqtvtUCIZOH406C/347568217d0abffc9bdd83d7d7381ec2/pexels-chevanon-302899.jpg",
                    details: {
                      size: 757129,
                      image: {
                        width: 6016,
                        height: 4016,
                      },
                    },
                    fileName: "pexels-chevanon-302899.jpg",
                    contentType: "image/jpeg",
                  },
                },
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "565ef2ju02bKnqqfS8v4b",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "image",
                },
              },
              revision: 1,
              createdAt: "2024-12-22T11:21:10.958Z",
              updatedAt: "2024-12-24T15:29:59.637Z",
              publishedAt: "2024-12-24T15:29:59.637Z",
              firstPublishedAt: "2024-12-24T15:29:59.637Z",
              publishedVersion: 3,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              imageTitle: "Coffee beans",
              image: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Asset",
                  id: "2goiBb38AZ8RPR2svWiSE5",
                  revision: 2,
                  createdAt: "2024-12-22T11:21:19.403Z",
                  updatedAt: "2024-12-24T15:29:59.569Z",
                  publishedAt: "2024-12-24T15:29:59.569Z",
                  firstPublishedAt: "2024-12-22T11:21:34.661Z",
                  publishedVersion: 5,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Coffee beans",
                  description: "An image of coffee beans",
                  file: {
                    url: "//images.ctfassets.net/a3pray39687x/2goiBb38AZ8RPR2svWiSE5/cd730a2c4d63139204447743c0820f19/pexels-igor-haritanovich-814387-1695052.jpg",
                    details: {
                      size: 2248153,
                      image: {
                        width: 6123,
                        height: 4082,
                      },
                    },
                    fileName: "pexels-igor-haritanovich-814387-1695052.jpg",
                    contentType: "image/jpeg",
                  },
                },
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "2sy3OMv9ljDbIFheTSZBG3",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "image",
                },
              },
              revision: 1,
              createdAt: "2024-12-22T11:21:44.479Z",
              updatedAt: "2024-12-24T15:29:59.655Z",
              publishedAt: "2024-12-24T15:29:59.655Z",
              firstPublishedAt: "2024-12-24T15:29:59.655Z",
              publishedVersion: 2,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              imageTitle: "Coffee Roasting",
              image: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Asset",
                  id: "4YnwdmZcaf10Ndxpss3Z9M",
                  revision: 2,
                  createdAt: "2024-12-22T11:22:27.815Z",
                  updatedAt: "2024-12-24T15:29:59.574Z",
                  publishedAt: "2024-12-24T15:29:59.574Z",
                  firstPublishedAt: "2024-12-22T11:22:50.992Z",
                  publishedVersion: 7,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Coffee Roasting",
                  description: "An image of beans being roasted",
                  file: {
                    url: "//images.ctfassets.net/a3pray39687x/4YnwdmZcaf10Ndxpss3Z9M/fed2459e8bab338405ff3a3d82cd2869/pexels-juanpphotoandvideo-894695.jpg",
                    details: {
                      size: 1976807,
                      image: {
                        width: 5472,
                        height: 3648,
                      },
                    },
                    fileName: "pexels-juanpphotoandvideo-894695.jpg",
                    contentType: "image/jpeg",
                  },
                },
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "6P5DIipPPy2onClZb9Kofh",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "image",
                },
              },
              revision: 1,
              createdAt: "2024-12-22T11:23:03.075Z",
              updatedAt: "2024-12-24T15:29:59.670Z",
              publishedAt: "2024-12-24T15:29:59.670Z",
              firstPublishedAt: "2024-12-24T15:29:59.670Z",
              publishedVersion: 4,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              imageTitle: "Portafilter brewing coffee",
              image: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Asset",
                  id: "2m1ScDXR0vQSXMYT4kpTCH",
                  revision: 2,
                  createdAt: "2024-12-22T11:23:22.876Z",
                  updatedAt: "2024-12-24T15:29:59.578Z",
                  publishedAt: "2024-12-24T15:29:59.578Z",
                  firstPublishedAt: "2024-12-22T11:23:48.040Z",
                  publishedVersion: 7,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Coffee Portafilter brewing",
                  description: "An image of espressos being made",
                  file: {
                    url: "//images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg",
                    details: {
                      size: 1072304,
                      image: {
                        width: 5533,
                        height: 3694,
                      },
                    },
                    fileName: "pexels-chevanon-324028.jpg",
                    contentType: "image/jpeg",
                  },
                },
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "dB6Uu9KPWJLA7apuVeFsm",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "image",
                },
              },
              revision: 1,
              createdAt: "2024-12-22T11:23:52.638Z",
              updatedAt: "2024-12-24T15:29:59.686Z",
              publishedAt: "2024-12-24T15:29:59.686Z",
              firstPublishedAt: "2024-12-24T15:29:59.686Z",
              publishedVersion: 3,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              imageTitle: "Coffee machine",
              image: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Asset",
                  id: "3aeaRH92vdkTQcdNXytjly",
                  revision: 2,
                  createdAt: "2024-12-22T11:24:26.690Z",
                  updatedAt: "2024-12-24T15:29:59.581Z",
                  publishedAt: "2024-12-24T15:29:59.581Z",
                  firstPublishedAt: "2024-12-22T11:24:57.812Z",
                  publishedVersion: 5,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Coffee machine",
                  description: "An image of a coffee machine",
                  file: {
                    url: "//images.ctfassets.net/a3pray39687x/3aeaRH92vdkTQcdNXytjly/0d1fe3d1dc91797b58547c188ec3c9e0/pexels-apgpotr-683039.jpg",
                    details: {
                      size: 1247748,
                      image: {
                        width: 5128,
                        height: 3045,
                      },
                    },
                    fileName: "pexels-apgpotr-683039.jpg",
                    contentType: "image/jpeg",
                  },
                },
              },
            },
          },
        ],
        featuredArticles: [
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "3TAD3h4QymmRe2toPEdQ1t",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "article",
                },
              },
              revision: 2,
              createdAt: "2024-12-22T11:28:53.224Z",
              updatedAt: "2024-12-26T21:44:17.765Z",
              publishedAt: "2024-12-26T21:44:17.765Z",
              firstPublishedAt: "2024-12-24T15:29:59.702Z",
              publishedVersion: 100,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              pageTitle: "Monmouth Coffee",
              pagePath: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "1VeJCacKQVJBeu8HnLrwjl",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "pagePaths",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-22T11:29:35.997Z",
                  updatedAt: "2024-12-24T15:29:59.742Z",
                  publishedAt: "2024-12-24T15:29:59.742Z",
                  firstPublishedAt: "2024-12-22T11:29:42.886Z",
                  publishedVersion: 4,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  pageTitle: "Reviews",
                  slug: "reviews",
                },
              },
              slug: "monmouth-coffee",
              seoMetadata: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "3jFL68tAS5VdmU7kst0IKO",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "seoMetadata",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-26T18:31:53.404Z",
                  updatedAt: "2024-12-26T21:44:09.689Z",
                  publishedAt: "2024-12-26T21:44:09.689Z",
                  firstPublishedAt: "2024-12-26T18:32:22.072Z",
                  publishedVersion: 8,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Monmouth Coffee",
                  description:
                    "Monmouth Coffee is a coffee store based in Seven Dials Market, London",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Entry",
                      id: "6zsPLhhVSKNWlEuzOVjIau",
                      contentType: {
                        sys: {
                          type: "Link",
                          linkType: "ContentType",
                          id: "image",
                        },
                      },
                      revision: 2,
                      createdAt: "2024-12-22T11:32:35.606Z",
                      updatedAt: "2024-12-24T15:29:59.757Z",
                      publishedAt: "2024-12-24T15:29:59.757Z",
                      firstPublishedAt: "2024-12-22T11:33:13.265Z",
                      publishedVersion: 4,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      imageTitle: "Monmouth Coffee - Covent Garden",
                      image: {
                        metadata: {
                          tags: [],
                          concepts: [],
                        },
                        sys: {
                          space: {
                            sys: {
                              type: "Link",
                              linkType: "Space",
                              id: "a3pray39687x",
                            },
                          },
                          type: "Asset",
                          id: "1O43IgL3gW9DM7qnycVtE8",
                          revision: 2,
                          createdAt: "2024-12-22T11:32:38.545Z",
                          updatedAt: "2024-12-24T15:29:59.584Z",
                          publishedAt: "2024-12-24T15:29:59.584Z",
                          firstPublishedAt: "2024-12-22T11:33:03.536Z",
                          publishedVersion: 7,
                          environment: {
                            sys: {
                              id: "master",
                              type: "Link",
                              linkType: "Environment",
                            },
                          },
                          locale: "en-GB",
                        },
                        fields: {
                          title: "Monmouth Coffee",
                          description:
                            "A photo of the shopfront of the Covent Garden store",
                          file: {
                            url: "//images.ctfassets.net/a3pray39687x/1O43IgL3gW9DM7qnycVtE8/01f274c2246fe4e8d4bc1e551b0875f9/monmouth-coffee.jpg",
                            details: {
                              size: 1106918,
                              image: {
                                width: 2000,
                                height: 1333,
                              },
                            },
                            fileName: "monmouth-coffee.jpg",
                            contentType: "image/jpeg",
                          },
                        },
                      },
                    },
                  },
                  keywords: [
                    "Coffee",
                    "Artisan Coffee",
                    "Barista",
                    "Brew",
                    "Travel",
                    "London",
                  ],
                },
              },
              articleIntroSnippet:
                "In London, a few elite coffee shops stand out, with Monmouth Coffee leading as a true pioneer in the coffee scene.",
              articlePreviewImage: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "6zsPLhhVSKNWlEuzOVjIau",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "image",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-22T11:32:35.606Z",
                  updatedAt: "2024-12-24T15:29:59.757Z",
                  publishedAt: "2024-12-24T15:29:59.757Z",
                  firstPublishedAt: "2024-12-22T11:33:13.265Z",
                  publishedVersion: 4,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  imageTitle: "Monmouth Coffee - Covent Garden",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Asset",
                      id: "1O43IgL3gW9DM7qnycVtE8",
                      revision: 2,
                      createdAt: "2024-12-22T11:32:38.545Z",
                      updatedAt: "2024-12-24T15:29:59.584Z",
                      publishedAt: "2024-12-24T15:29:59.584Z",
                      firstPublishedAt: "2024-12-22T11:33:03.536Z",
                      publishedVersion: 7,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      title: "Monmouth Coffee",
                      description:
                        "A photo of the shopfront of the Covent Garden store",
                      file: {
                        url: "//images.ctfassets.net/a3pray39687x/1O43IgL3gW9DM7qnycVtE8/01f274c2246fe4e8d4bc1e551b0875f9/monmouth-coffee.jpg",
                        details: {
                          size: 1106918,
                          image: {
                            width: 2000,
                            height: 1333,
                          },
                        },
                        fileName: "monmouth-coffee.jpg",
                        contentType: "image/jpeg",
                      },
                    },
                  },
                },
              },
              region: "europe",
              storeLocation: {
                lon: -0.12675,
                lat: 51.51437,
              },
              coffeeRating: 98,
              reviewDate: "2024-12-22",
              articleContent: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Monmouth Coffee: London’s Crown Jewel in Coffee Craftsmanship",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-3",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "In the bustling heart of London’s Seven Dials Market, ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "Monmouth Coffee",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " stands as a beacon for coffee lovers and connoisseurs alike. With a history dating back to 1978, this iconic establishment has earned its reputation as the royalty of London’s coffee scene. From humble beginnings in a basement to its status today as a revered institution, Monmouth Coffee continues to set the gold standard for quality and sustainability in every cup.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Step Back in Time: The Atmosphere",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Walking into Monmouth Coffee is like stepping into old London. The rustic wooden interior, combined with the rich aroma of freshly roasted coffee beans, instantly transports you to a time when craftsmanship and tradition were paramount. The ambience is warm and inviting, exuding a sense of authenticity that’s rare in today’s fast-paced coffee culture.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Despite its charm, the store is often bustling with activity. The constant flow of customers is a testament to the brand’s enduring appeal. While the busy atmosphere might not suit everyone’s preference for a quiet coffee break, it adds to the lively and quintessentially London experience that Monmouth offers.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Coffee with a Conscience",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Monmouth Coffee isn’t just about making great coffee—it’s about making coffee responsibly. Their sourcing philosophy is rooted in building sustainable, fair, and equal trade relationships with coffee producers. As detailed on their website:",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value:
                              '"We source and roast coffee from single farms, estates and cooperatives. When we taste a coffee that we like, we want to know where it comes from and who grows, picks and processes it. We believe that where such a relationship exists, quality, quantity and price requirements can be discussed in an open and equal way."',
                            nodeType: "text",
                          },
                        ],
                        nodeType: "paragraph",
                      },
                    ],
                    nodeType: "blockquote",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "This commitment to sustainability is woven into every aspect of their business. The beans are meticulously sourced from around the globe, reflecting a deep respect for the craft of coffee growing. Through extensive travel and close relationships with farmers, Monmouth ensures that each cup tells a story of quality, care, and mutual respect.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "The Coffee Experience",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Whether you’re ordering your favourite brew or exploring new varieties, the knowledgeable and approachable staff at Monmouth are always eager to help. Their deep understanding of coffee shines as they guide you through their rotating selection of beans, offering insights into flavour profiles and origins. It’s this personalized touch that elevates the experience from a simple transaction to an engaging exploration of coffee culture.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "For those looking to take the experience home, Monmouth offers the option to purchase beans—either whole or ground to your specification. The frequent rotation of beans ensures there’s always something new to try, making each visit a unique adventure.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "My Go-To: Fazenda and a Candle",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "During my visits, I’m drawn to their ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "Fazenda variety",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          ", which is sourced from Brazil. This particular coffee boasts a rich flavor profile with notes of ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "dark chocolate, caramel, and nuts",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          "—a combination that never fails to impress both me and my wife. Pairing this indulgent brew with a ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "canele",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " completes the experience, creating a perfect harmony of flavors that’s hard to beat.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Note on Sustainability",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Monmouth’s commitment to sustainability extends beyond their sourcing practices. Customers are encouraged to bring their own cups or use the provided ceramic options for dine-in. For takeaway, they offer reusable cups for purchase, emphasizing their dedication to reducing waste.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Seating and London’s Hustle",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "While Monmouth does provide seating both inside and outside, it’s important to note that the store is perpetually busy. If you’re lucky enough to snag a spot, it’s a wonderful place to enjoy your coffee and watch the world go by. On days when London’s unpredictable weather permits, the outdoor seating adds an extra layer of charm.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Final Thoughts",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Monmouth Coffee isn’t just a coffee shop—it’s a cornerstone of London’s coffee heritage. From the quality of the beans to the care in their sourcing and the welcoming atmosphere, every detail is thoughtfully executed. While the hustle and bustle might feel overwhelming at times, it’s all part of the Monmouth experience and a reflection of its well-deserved popularity.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "If you’re a coffee enthusiast visiting London, Monmouth Coffee is an unmissable destination. Whether you’re sipping on a Fazenda brew or exploring their latest bean rotation, you’ll leave with a deeper appreciation for the art of coffee-making—and perhaps, like me, with a bag of beans to relive the experience at home.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                ],
                nodeType: "document",
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "1ym5wZ5yyPsGFn0lAwh9Dg",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "article",
                },
              },
              revision: 1,
              createdAt: "2024-12-26T13:43:08.513Z",
              updatedAt: "2024-12-27T16:32:16.093Z",
              publishedAt: "2024-12-27T16:32:16.093Z",
              firstPublishedAt: "2024-12-27T16:32:16.093Z",
              publishedVersion: 107,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              pageTitle: "Little Owl Coffee",
              pagePath: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "1VeJCacKQVJBeu8HnLrwjl",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "pagePaths",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-22T11:29:35.997Z",
                  updatedAt: "2024-12-24T15:29:59.742Z",
                  publishedAt: "2024-12-24T15:29:59.742Z",
                  firstPublishedAt: "2024-12-22T11:29:42.886Z",
                  publishedVersion: 4,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  pageTitle: "Reviews",
                  slug: "reviews",
                },
              },
              slug: "little-owl-coffee",
              seoMetadata: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "UXwnZt29sFjYjttoRKUbL",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "seoMetadata",
                    },
                  },
                  revision: 1,
                  createdAt: "2024-12-26T18:29:11.557Z",
                  updatedAt: "2024-12-26T18:30:05.983Z",
                  publishedAt: "2024-12-26T18:30:05.983Z",
                  firstPublishedAt: "2024-12-26T18:30:05.983Z",
                  publishedVersion: 8,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "Little Owl Coffee",
                  description:
                    "Little Owl Coffee is a coffee roaster based in Denver, Colorado, United States",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Entry",
                      id: "30ugPKsmBMm3MrmgzsaGbw",
                      contentType: {
                        sys: {
                          type: "Link",
                          linkType: "ContentType",
                          id: "image",
                        },
                      },
                      revision: 1,
                      createdAt: "2024-12-26T13:49:18.869Z",
                      updatedAt: "2024-12-26T13:49:52.065Z",
                      publishedAt: "2024-12-26T13:49:52.065Z",
                      firstPublishedAt: "2024-12-26T13:49:52.065Z",
                      publishedVersion: 3,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      imageTitle: "Little Owl Coffee",
                      image: {
                        metadata: {
                          tags: [],
                          concepts: [],
                        },
                        sys: {
                          space: {
                            sys: {
                              type: "Link",
                              linkType: "Space",
                              id: "a3pray39687x",
                            },
                          },
                          type: "Asset",
                          id: "54io2gnYOmkGvKvLGtMsNd",
                          revision: 1,
                          createdAt: "2024-12-26T13:49:22.289Z",
                          updatedAt: "2024-12-26T13:49:39.432Z",
                          publishedAt: "2024-12-26T13:49:39.432Z",
                          firstPublishedAt: "2024-12-26T13:49:39.432Z",
                          publishedVersion: 5,
                          environment: {
                            sys: {
                              id: "master",
                              type: "Link",
                              linkType: "Environment",
                            },
                          },
                          locale: "en-GB",
                        },
                        fields: {
                          title: "Little Owl Coffee - Denver",
                          description: "Little Owl Coffee - Denver",
                          file: {
                            url: "//images.ctfassets.net/a3pray39687x/54io2gnYOmkGvKvLGtMsNd/625b2eed6d27d3b3df4b171c0640432e/little-owl-coffee.webp",
                            details: {
                              size: 52578,
                              image: {
                                width: 1071,
                                height: 602,
                              },
                            },
                            fileName: "little-owl-coffee.webp",
                            contentType: "image/webp",
                          },
                        },
                      },
                    },
                  },
                  keywords: [
                    "Coffee",
                    "Artisan Coffee",
                    "Barista",
                    "Brew",
                    "Travel",
                  ],
                },
              },
              articleIntroSnippet:
                "One of Denver's finest coffee stores as the store embodies a true sense of working locally and producing top quality coffee, a must visit if in Denver",
              articlePreviewImage: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "30ugPKsmBMm3MrmgzsaGbw",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "image",
                    },
                  },
                  revision: 1,
                  createdAt: "2024-12-26T13:49:18.869Z",
                  updatedAt: "2024-12-26T13:49:52.065Z",
                  publishedAt: "2024-12-26T13:49:52.065Z",
                  firstPublishedAt: "2024-12-26T13:49:52.065Z",
                  publishedVersion: 3,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  imageTitle: "Little Owl Coffee",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Asset",
                      id: "54io2gnYOmkGvKvLGtMsNd",
                      revision: 1,
                      createdAt: "2024-12-26T13:49:22.289Z",
                      updatedAt: "2024-12-26T13:49:39.432Z",
                      publishedAt: "2024-12-26T13:49:39.432Z",
                      firstPublishedAt: "2024-12-26T13:49:39.432Z",
                      publishedVersion: 5,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      title: "Little Owl Coffee - Denver",
                      description: "Little Owl Coffee - Denver",
                      file: {
                        url: "//images.ctfassets.net/a3pray39687x/54io2gnYOmkGvKvLGtMsNd/625b2eed6d27d3b3df4b171c0640432e/little-owl-coffee.webp",
                        details: {
                          size: 52578,
                          image: {
                            width: 1071,
                            height: 602,
                          },
                        },
                        fileName: "little-owl-coffee.webp",
                        contentType: "image/webp",
                      },
                    },
                  },
                },
              },
              region: "north-america",
              storeLocation: {
                lon: -104.988,
                lat: 39.744,
              },
              coffeeRating: 93,
              reviewDate: "2024-12-29",
              articleContent: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Little Owl Coffee: A Must-Visit Gem in Denver’s Coffee Scene",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-3",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Denver is home to a growing number of exceptional coffee shops, but ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "Little Owl Coffee",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " stands out as a true beacon of quality and consistency. With several branches scattered throughout the city, this establishment has mastered the art of sourcing premium beans and delivering exceptional flavours. For anyone on the hunt for the perfect cup, Little Owl Coffee is undeniably one of the best coffee spots in Denver, Colorado.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Coffee Experience Worth the Wait",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "It’s not uncommon to see a line forming at Little Owl Coffee, and for good reason. The allure isn’t just in the coffee itself but in the overall experience. Each cup is a testament to the brand’s mission: to elevate coffee to an art form. Paired with their delectable pastries, it’s no wonder locals and visitors alike flock to their doors. The wait becomes a mere prelude to the reward of sipping one of their expertly crafted beverages.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Dedication to Excellence",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Little Owl Coffee’s mission is straightforward: take coffee to the next level. And they deliver on this promise with remarkable consistency. From the moment you step inside, you can feel the meticulous attention to detail that underscores every aspect of the experience. The welcoming aroma of freshly brewed coffee, the clean and inviting decor, and the smiling faces of skilled baristas all set the stage for a memorable visit.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Baristas here aren’t just preparing coffee—they’re crafting it. Each drink is made with precision and care, ensuring that every cup meets their high standards. Their offerings extend beyond the cafe experience, as they also sell beans for you to take home, allowing you to recreate their magic in your own kitchen.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Rotating Selection of Exceptional Beans",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "One of the highlights of Little Owl Coffee is its rotating selection of beans. On my visit, the lineup included a curated selection of origins and processing methods, each promising a unique flavour profile:",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Ethiopia Gigesa Natural",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": A vibrant, fruity coffee with natural sweetness.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Ethiopia Gigesa Washed",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": Bright and clean, showcasing the elegance of washed processing.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Ethiopia Ayla Bombe Washed",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": Subtle complexity with delicate floral notes.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Stuardo Coto (Guatemala)",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": Balanced with nutty and chocolate undertones.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Brazil Inacio Urban",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": Smooth and comforting, perfect for those who enjoy a classic profile.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [
                                  {
                                    type: "bold",
                                  },
                                ],
                                value: "Penrose (Mexico, Brazil)",
                                nodeType: "text",
                              },
                              {
                                data: {},
                                marks: [],
                                value:
                                  ": A versatile blend ideal for any brewing method.",
                                nodeType: "text",
                              },
                            ],
                            nodeType: "paragraph",
                          },
                        ],
                        nodeType: "list-item",
                      },
                    ],
                    nodeType: "unordered-list",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Flavours rotate frequently, so it’s always worth checking their website or asking the baristas about what’s currently available. This variety not only keeps the menu exciting but also highlights the team’s commitment to showcasing diverse coffee profiles.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "My Personal Favorites: Cortado and Flat White",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "When visiting Little Owl Coffee, I typically opt for a ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "cortado",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value: " or ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "flat white",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          ". Both of these options strike a perfect balance, allowing the coffee’s flavour to shine without being overpowered by milk. The cortado’s bold profile and the flat white’s silky smoothness are ideal for appreciating the craftsmanship behind each cup.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "The coffee itself is a revelation. The notes of ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "pomegranate",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value: " and ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "black cherry",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " add a distinct, fruity complexity that is both delightful and memorable. During my visits, I never encountered any hint of over-extraction or under-extraction—just consistently well-brewed coffee. Paired with high-quality cow’s milk and topped with fine latte art, each cup was a masterpiece.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Final Thoughts",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Little Owl Coffee is more than just a coffee shop—it’s an experience that every coffee enthusiast should seek out. Whether you’re looking to indulge in a perfectly brewed cortado, take home a bag of expertly sourced beans, or simply savour the ambience of a thoughtfully curated cafe, this Denver gem has it all.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Their commitment to excellence, rotating coffee selection, and consistently stellar execution make Little Owl Coffee a standout destination. If your flavour preferences lean toward fruity and vibrant coffees like pomegranate and black cherry, this is the place for you. Even if they don’t, the skill and care that goes into every cup will undoubtedly leave you impressed. Don’t miss the chance to elevate your coffee experience with a visit to Little Owl Coffee.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                ],
                nodeType: "document",
              },
            },
          },
          {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "a3pray39687x",
                },
              },
              type: "Entry",
              id: "6pPjIEqX4xWBPLyELPUHoy",
              contentType: {
                sys: {
                  type: "Link",
                  linkType: "ContentType",
                  id: "article",
                },
              },
              revision: 1,
              createdAt: "2024-12-26T15:04:36.249Z",
              updatedAt: "2024-12-26T21:42:19.227Z",
              publishedAt: "2024-12-26T21:42:19.227Z",
              firstPublishedAt: "2024-12-26T21:42:19.227Z",
              publishedVersion: 41,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              locale: "en-GB",
            },
            fields: {
              pageTitle: "J.W. Cafe",
              pagePath: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "1VeJCacKQVJBeu8HnLrwjl",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "pagePaths",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-22T11:29:35.997Z",
                  updatedAt: "2024-12-24T15:29:59.742Z",
                  publishedAt: "2024-12-24T15:29:59.742Z",
                  firstPublishedAt: "2024-12-22T11:29:42.886Z",
                  publishedVersion: 4,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  pageTitle: "Reviews",
                  slug: "reviews",
                },
              },
              slug: "j-w-cafe",
              seoMetadata: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "264nb8Iwe4EgYU0URFVFLK",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "seoMetadata",
                    },
                  },
                  revision: 2,
                  createdAt: "2024-12-26T18:32:34.248Z",
                  updatedAt: "2024-12-26T21:42:06.771Z",
                  publishedAt: "2024-12-26T21:42:06.771Z",
                  firstPublishedAt: "2024-12-26T18:33:05.011Z",
                  publishedVersion: 11,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  title: "J.W. Cafe",
                  description:
                    "J.W. Cafe is a cafe located in Taichung, Taiwan",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Entry",
                      id: "3zkCYaC2CPoyVl60YLCzXT",
                      contentType: {
                        sys: {
                          type: "Link",
                          linkType: "ContentType",
                          id: "image",
                        },
                      },
                      revision: 1,
                      createdAt: "2024-12-26T15:06:05.062Z",
                      updatedAt: "2024-12-26T15:06:40.174Z",
                      publishedAt: "2024-12-26T15:06:40.174Z",
                      firstPublishedAt: "2024-12-26T15:06:40.174Z",
                      publishedVersion: 3,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      imageTitle: "J.W. Cafe",
                      image: {
                        metadata: {
                          tags: [],
                          concepts: [],
                        },
                        sys: {
                          space: {
                            sys: {
                              type: "Link",
                              linkType: "Space",
                              id: "a3pray39687x",
                            },
                          },
                          type: "Asset",
                          id: "26Nl3bEwW77QfNE8KiTS5H",
                          revision: 1,
                          createdAt: "2024-12-26T15:06:07.613Z",
                          updatedAt: "2024-12-26T15:06:23.755Z",
                          publishedAt: "2024-12-26T15:06:23.755Z",
                          firstPublishedAt: "2024-12-26T15:06:23.755Z",
                          publishedVersion: 5,
                          environment: {
                            sys: {
                              id: "master",
                              type: "Link",
                              linkType: "Environment",
                            },
                          },
                          locale: "en-GB",
                        },
                        fields: {
                          title: "J.W. Cafe",
                          description: "J.W. Cafe in Taichung, Taiwan",
                          file: {
                            url: "//images.ctfassets.net/a3pray39687x/26Nl3bEwW77QfNE8KiTS5H/1e389d7118abc008b7c443c21b459b6b/jw-cafe.jpg",
                            details: {
                              size: 457196,
                              image: {
                                width: 1360,
                                height: 1020,
                              },
                            },
                            fileName: "jw-cafe.jpg",
                            contentType: "image/jpeg",
                          },
                        },
                      },
                    },
                  },
                  keywords: [
                    "Coffee",
                    "Artisan Coffee",
                    "Barista",
                    "Brew",
                    "Travel",
                    "Asia",
                    "Taiwan",
                    "Taichung",
                  ],
                },
              },
              articleIntroSnippet:
                "J.W. Cafe is a stylish little cafe located in Taichung, Taiwan and is responsible for making carefully crafted brews utilising only the finest beans available that are roasted on site",
              articlePreviewImage: {
                metadata: {
                  tags: [],
                  concepts: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: "Link",
                      linkType: "Space",
                      id: "a3pray39687x",
                    },
                  },
                  type: "Entry",
                  id: "3zkCYaC2CPoyVl60YLCzXT",
                  contentType: {
                    sys: {
                      type: "Link",
                      linkType: "ContentType",
                      id: "image",
                    },
                  },
                  revision: 1,
                  createdAt: "2024-12-26T15:06:05.062Z",
                  updatedAt: "2024-12-26T15:06:40.174Z",
                  publishedAt: "2024-12-26T15:06:40.174Z",
                  firstPublishedAt: "2024-12-26T15:06:40.174Z",
                  publishedVersion: 3,
                  environment: {
                    sys: {
                      id: "master",
                      type: "Link",
                      linkType: "Environment",
                    },
                  },
                  locale: "en-GB",
                },
                fields: {
                  imageTitle: "J.W. Cafe",
                  image: {
                    metadata: {
                      tags: [],
                      concepts: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: "Link",
                          linkType: "Space",
                          id: "a3pray39687x",
                        },
                      },
                      type: "Asset",
                      id: "26Nl3bEwW77QfNE8KiTS5H",
                      revision: 1,
                      createdAt: "2024-12-26T15:06:07.613Z",
                      updatedAt: "2024-12-26T15:06:23.755Z",
                      publishedAt: "2024-12-26T15:06:23.755Z",
                      firstPublishedAt: "2024-12-26T15:06:23.755Z",
                      publishedVersion: 5,
                      environment: {
                        sys: {
                          id: "master",
                          type: "Link",
                          linkType: "Environment",
                        },
                      },
                      locale: "en-GB",
                    },
                    fields: {
                      title: "J.W. Cafe",
                      description: "J.W. Cafe in Taichung, Taiwan",
                      file: {
                        url: "//images.ctfassets.net/a3pray39687x/26Nl3bEwW77QfNE8KiTS5H/1e389d7118abc008b7c443c21b459b6b/jw-cafe.jpg",
                        details: {
                          size: 457196,
                          image: {
                            width: 1360,
                            height: 1020,
                          },
                        },
                        fileName: "jw-cafe.jpg",
                        contentType: "image/jpeg",
                      },
                    },
                  },
                },
              },
              region: "asia",
              storeLocation: {
                lon: 120.6613,
                lat: 24.14831,
              },
              coffeeRating: 90,
              reviewDate: "2024-11-08",
              articleContent: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "J.W. Cafe: A Coffee Lover’s Haven in the Heart of Taichung",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-3",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Nestled in the bustling city of Taichung, ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "J.W. Cafe",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " has made a name for itself among coffee aficionados. Renowned for its meticulously crafted beverages, the cafe strikes a delicate balance between quality and price. While some might argue that the prices are on the higher end for Taiwan, the exceptional quality justifies the expense, making it a worthwhile indulgence for those who value premium coffee experiences.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "A Welcoming Atmosphere",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          'The moment you step inside J.W. Cafe, you’re greeted by an ambiance that radiates calm and sophistication. The thoughtfully designed interior exudes a "cool and collected" vibe, offering a tranquil retreat from the bustling streets outside. Patrons have the flexibility to choose between seating at tables or the bar, catering to both social gatherings and solitary coffee breaks. This well-considered layout enhances the overall experience, providing a space where one can truly unwind.',
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Coffee Crafted with Passion",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "The cornerstone of J.W. Cafe’s appeal lies in its unwavering commitment to quality. The coffee beans are undeniably fresh, and the expertise of the barista is evident in every cup. Latte art, far from being an afterthought, is approached with precision and artistry, a testament to the barista’s dedication to their craft. Watching the careful preparation feels like witnessing an artist at work, adding a touch of charm to the experience.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "For those seeking a more traditional coffee experience, the ",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "bold",
                          },
                        ],
                        value: "drip coffee",
                        nodeType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " comes highly recommended. It’s not just a drink but an exploration of flavors, providing a nuanced and aromatic profile that’s sure to delight even the most discerning palates.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "My Experience: A Latte to Remember",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "On my visit, I opted for a latte—a true test of a cafe's capabilities. The milk, often overlooked in coffee preparation, was of notably high quality, complementing the rich espresso base perfectly. The result was a velvety, harmonious cup that lingered pleasantly on the palate. It’s clear that every element, from the beans to the milk, is carefully selected to ensure an exceptional final product.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Final Thoughts",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "heading-4",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "J.W. Cafe is more than just a place to grab a coffee—it’s a destination for those who appreciate the finer details of the coffee-making process. Whether you’re a casual drinker or a seasoned enthusiast, this cafe offers a memorable experience that’s worth every penny. With its welcoming atmosphere, skilled baristas, and top-tier ingredients, J.W. Cafe sets a high standard for coffee culture in Taichung.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "If you’re in the area and looking for a spot to relax and enjoy a truly great cup of coffee, J.W. Cafe should undoubtedly be on your list.",
                        nodeType: "text",
                      },
                    ],
                    nodeType: "paragraph",
                  },
                ],
                nodeType: "document",
              },
            },
          },
        ],
        pageInformation: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "A journey to discover quality coffee",
                  nodeType: "text",
                },
              ],
              nodeType: "heading-1",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "Discovering the world of coffee, one cup at a time",
                  nodeType: "text",
                },
              ],
              nodeType: "heading-2",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "We are an independent collection of reviews dedicated to helping you find exceptional coffee experiences. From hidden gems to renowned spots, our focus is on quality over gimmicks. With a special emphasis on the vibrant coffee scene in London and accompanied by highlights from around the globe, we aim to guide you to the cafes that truly care about crafting the perfect cup.",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Whether you're a casual coffee drinker or a devoted connoisseur, this is your trusted source for honest, insightful reviews that prioritize great coffee over flashy trends. Let's elevate your coffee journey together.",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "document",
        },
      },
    };

    render(<Home landingPageProps={mockLandingPageProps} />);

    const homePageTitle = screen.getByRole("heading", { level: 1 });

    expect(homePageTitle).toBeInTheDocument();
    // expect(homePageTitle).toHaveTextContent("Welcome to Coffee Reviews");
  });
});
