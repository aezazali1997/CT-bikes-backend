import connectDB from '../config/db';
import productModel from '../models/product.model';
let productSeeds = [
    // parent category Bike Accessories XF
    {
        title: "Axles and Bearings title",
        description: "Axles and Bearings description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Axles and Bearings",
        price: 2900,
        comparePrice: 3500,
        quantity: 0,
        quantity_in_stock: 0,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/bf08339-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08339-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08339-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08339-600x600.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/bf08339-600x600.jpg",
    },
    {
        title: "10mm Track Nut (Single)",
        description: "Forme Alport HTE description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Axles and Bearings",
        price: 2960,
        comparePrice: 3000,
        quantity: 0,
        quantity_in_stock: 0,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/bf08335-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08335-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08335-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08335-600x600.jpg"


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/bf08335-600x600.jpg",
    },
    {
        title: "10.0 X 145mm Hollow Q.R. Axle",
        description: "10.0 X 145mm Hollow Q.R. Axle description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Axles and Bearings",
        price: 3060,
        comparePrice: 200,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/bf08373-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08373-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08373-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/bf08373-600x600.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/bf08373-600x600.jpg",
    },


    {
        title: "Super B TB-PF33 Truing Stand Centreing Gauge",
        description: "Super B TB-PF33 Truing Stand Centreing Gauge description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Bike Maintenance Tools",
        price: 1060,
        comparePrice: 2000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/sbpf33-super-b-tb-pf33-truing-stand-centreing-gauge-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/sbpf33-super-b-tb-pf33-truing-stand-centreing-gauge-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/sbpf33-super-b-tb-pf33-truing-stand-centreing-gauge-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/sbpf33-super-b-tb-pf33-truing-stand-centreing-gauge-600x600.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/sbpf33-super-b-tb-pf33-truing-stand-centreing-gauge-600x600.jpg"
    },
    {
        title: "Weldtite Cyclo Torque Wrench 1/4″ 2-24nm",
        description: "Weldtite Cyclo Torque Wrench 1/4″ 2-24nm description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Bike Maintenance Tools",
        price: 506,
        comparePrice: 220,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg"
    },
    {
        title: "Super B TB-TW05 Pre-Set 5nm Torque Wrench Inc Bits",
        description: "Super B TB-TW05 Pre-Set 5nm Torque Wrench Inc Bits description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Bike Maintenance Tools",
        price: 5000,
        comparePrice: 3999,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/cyc06355-weldtite-cyclo-torque-wrench-1-4-2-24nm-1-600x600.jpg"
    },

    {
        title: "Atomlab Pads For All Atomlab/Bengal Brakes Pair",
        description: "Atomlab  Pads For All Atomlab/Bengal Brakes Pair description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Brake Pads Discs and Components",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg"
    },
    {
        title: "Lezyne  Replacement CFH Hose1",
        description: "Lezyne Replacement CFH Hose description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Brake Pads Discs and Components",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg"
    },
    {
        title: "Lezyne Neoprene Hose Cover1",
        description: "Lezyne Neoprene Hose Cover description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Brake Pads Discs and Components",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/bbcbbf33-8d30-4607-b6b4-a8af00bec343_800x800.jpg"
    },

    {
        title: "Praxis CR 110 BCD Buzz Sport Rings 48/32 10/11/12sp",
        description: "Praxis CR 110 BCD Buzz Sport Rings 48/32 10/11/12sp description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Cranksets Chainrings And Chains",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg"
    },
    {
        title: "Praxis CR 110 BCD Buzz Sport Rings 48/32 10/11/12sp Urban Grey/Yellow 27.5” E-Bike 11",
        description: "Forme Alport HTE description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Cranksets Chainrings And Chains",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg"
    },
    {
        title: "Praxis  CR  110 BCD Buzz Sport Rings 48/32 10/11/12sp",
        description: "Praxis  CR  110 BCD Buzz Sport Rings 48/32 10/11/12sp description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Cranksets Chainrings And Chains",
        price: 50,
        comparePrice: 100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/92b123b7-bbbf-48ff-b5cd-ad0a01120701_4000x4000-1536x1536.jpg"
    },

    {
        title: "title 1 XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15",
        description: "XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15 description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Forks And Suspensions",
        price: 100,
        comparePrice: 10,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg"
    },
    {
        title: "title 2 XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15",
        description: "XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15 description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Forks And Suspensions",
        price: 150,
        comparePrice: 180,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg"
    },
    {
        title: "title 3 XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15",
        description: "XF Slant 34 26/27.5 RL2 160 Taper Black Stanchion X-15 description",
        parent_category: "640ffe80a449de34967a019d",
        category: "Forks And Suspensions",
        price: 400,
        comparePrice: 120,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",
            "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/2022/10/94679f83-09c8-497f-9965-adab00bd7955_1500x1500.jpg"
    },
    // bikes parent category
    {
        title: "Roadbike title 1 Grey/Yellow 27.5” E-Bike 11",
        description: "this is road bike category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Roadbike",
        price: 4000,
        comparePrice: 5020,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg"
    },
    {
        title: "Roadbike title 2 Grey/Yellow 27.5” E-Bike 11",
        description: "this is road bike category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Roadbike",
        price: 6000,
        comparePrice: 5080,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg"
    },
    {
        title: "Roadbike title 3 Grey/Yellow 27.5” E-Bike 11",
        description: "this is road bike category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Roadbike",
        price: 4050,
        comparePrice: 4020,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",
           "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/s-l500-1-3.jpg"
    }
,
    {
        title: "Children's Bike title 1 E-Bike 11",
        description: "this is Children's Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Children's Bike",
        price: 2000,
        comparePrice: 2999,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg"
    },
    {
        title: "Children's Bike title 2 E-Bike 11",
        description: "this is Children's Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Children's Bike",
        price: 3050,
        comparePrice: 4999,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg"
    },
    {
        title: "Children's Bike title 3 E-Bike 11",
        description: "this is Children's Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Children's Bike",
        price: 5000,
        comparePrice: 6000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",
          "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg",


        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_13_05_3047_images-600x400.jpg"
    },

    {
        title: "Electric Bike title 1” E-Bike 11",
        description: "this is Electric Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Electric Bike",
        price: 9000,
        comparePrice: 8000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg"
    },
    {
        title: "Electric Bike title 2 E-Bike 11",
        description: "this is Electric Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Electric Bike",
        price: 10000,
        comparePrice: 11000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg"
    },
    {
        title: "Electric Bike title 3 E-Bike 11",
        description: "this is Electric Bike  category description this is road",
        parent_category: "640ffeaaa449de34967a01a0",
        category: "Electric Bike",
        price: 7000,
        comparePrice: 6040,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/fm_2021_04_07_04_07_15_85436_images-600x450.jpg"
    },

    // parent category BMX Bikes
    {
        title: "Forme Alport Cuda title 1",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Cuda",
        price: 4000,
        comparePrice: 3040,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg"
    },
    {
        title: "Forme Alport Cuda title 2",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Cuda",
        price: 7000,
        comparePrice: 6040,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg"
    },
    {
        title: "Forme Alport Cuda title 3",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Cuda",
        price: 8000,
        comparePrice: 9040,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",
        "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/wtp2142-wethepeople-the-avenger-27-5-freestyle-mtb-matte-charcola-grey-1-600x600.jpg"
    },

    {
        title: "Radio title 1 for Bike 11",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Radio",
        price: 9999,
        comparePrice: 11040,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg"
    },
    {
        title: "Radio title 2 for ” E-Bike 11",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Radio",
        price: 15000,
        comparePrice: 2300,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg"
    },
    {
        title: "Radio title 3 E-Bike 11",
        description: "this is BMX Bike  category description this is BMX",
        parent_category: "640ffeb7a449de34967a01a3",
        category: "Radio",
        price: 2098,
        comparePrice: 1200,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",
       "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/radio_raceline_xenon_pro_xl_white-02_1-1-600x400.jpg"
    },

    // parent category brand primary
    {
        title: "Arcos title 1 brands primary title",
        description: "this is Arcos  category description this is Arcos",
        parent_category: "640ffedca449de34967a01a6",
        category: "Arcos",
        price: 5096,
        comparePrice: 4938,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg"
    },
    {
        title: "Arcos title 2 brands primary title",
        description: "this is Arcos  category description this is Arcos",
        parent_category: "640ffedca449de34967a01a6",
        category: "Arcos",
        price: 1000,
        comparePrice: 980,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg"
    },
    {
        title: "Arcos brands title 3 primary title",
        description: "this is Arcos  category description this is Arcos",
        parent_category: "640ffedca449de34967a01a6",
        category: "Arcos",
        price: 450,
        comparePrice: 600,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/44002000_1-600x600.jpg"
    },

    {
        title: "Alipina title 1 brands primary title",
        description: "this is Alipina  category description this is Alipina",
        parent_category: "640ffedca449de34967a01a6",
        category: "Alipina",
        price: 9000,
        comparePrice: 9100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg"
    },
    {
        title: "Alipina  title 2 brands primary title",
        description: "this is Alipina  category description this is Alipina",
        parent_category: "640ffedca449de34967a01a6",
        category: "Alipina",
        price: 10000,
        comparePrice: 11000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg"
    },
    {
        title: "Alipina title 3 brands primary title",
        description: "this is Alipina  category description this is Alipina",
        parent_category: "640ffedca449de34967a01a6",
        category: "Alipina",
        price: 12000,
        comparePrice: 13000,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/ah20t23-alpina-haga-helmet-51-56cm-indigo_1_3-600x600.jpg"
    },
    
    {
        title: "Beto title 1 brands primary title",
        description: "this is Beto  category description this is Beto",
        parent_category: "640ffedca449de34967a01a6",
        category: "Beto",
        price: 200,
        comparePrice: 180,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg"
    },
    {
        title: "Beto title 2 brands primary title",
        description: "this is Beto  category description this is Beto",
        parent_category: "640ffedca449de34967a01a6",
        category: "Beto",
        price: 100,
        comparePrice: 200,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg"
    },
    {
        title: "Beto title 3 brands primary title",
        description: "this is Beto  category description this is Beto",
        parent_category: "640ffedca449de34967a01a6",
        category: "Beto",
        price: 400,
        comparePrice: 430,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/pu807_1-1.jpg"
    },

    // parent category footwear
    {
        title: "BMX shoes title 1 brands primary title",
        description: "this is BMX shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "BMX shoes",
        price: 400,
        comparePrice: 430,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg"
    },
    {
        title: "BMX shoes title 2 brands primary title",
        description: "this is BMX shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "BMX shoes",
        price: 400,
        comparePrice: 430,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg"
    },
    {
        title: "BMX shoes title 3 brands primary title",
        description: "this is BMX shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "BMX shoes",
        price: 400,
        comparePrice: 430,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/onso200-oneal-sender-flat-shoe-black-grey-side_1_2-600x600.jpg"
    },

    {
        title: "Cycling Cyclocross Shoes title 1 brands primary title",
        description: "this is Cycling Cyclocross Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Cyclocross Shoes",
        price: 500,
        comparePrice: 630,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg"
    },
    {
        title: "Cycling Cyclocross Shoes title 2 brands primary title",
        description: "this is Cycling Cyclocross Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Cyclocross Shoes",
        price: 980,
        comparePrice: 700,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg"
    },
    {
        title: "Cycling Cyclocross Shoes title 3 brands primary title",
        description: "this is Cycling Cyclocross Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Cyclocross Shoes",
        price: 1000,
        comparePrice: 1100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/httpsmc-staging.moorelarge.co_.ukmediacatalogproducththttpsmc-staging.moorelarge.co_.ukmediacatalogproductcache8b5c625fb692b8dde426740670a5d3dbtxtx312_1-1-600x400.jpg"
    },

    {
        title: "Cycling Road Shoes title 1 brands primary title",
        description: "this is Cycling Road Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Road Shoes",
        price: 2000,
        comparePrice: 1200,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg"
    },
    {
        title: "Cycling Road Shoes title 2 brands primary title",
        description: "this is Cycling Road Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Road Shoes",
        price: 1000,
        comparePrice: 1100,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg"
    },
    {
        title: "Cycling Road Shoes title 3 brands primary title",
        description: "this is Cycling Road Shoes  category description this is Beto",
        parent_category: "640ffef2a449de34967a01a9",
        category: "Cycling Road Shoes",
        price: 6800,
        comparePrice: 4500,
        quantity: 0,
        quantity_in_stock: 3,
        sku: "",
        images: [
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",
      "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg",

        ],
        main_image: "https://ctbikes.co.uk/wp-content/uploads/lsh851-lake-cx146-winter-road-boot-black-side_10-600x600.jpg"
    },


]

console.log(productSeeds.length)
const  importData = async () => {
    try {
        connectDB();
        console.log("Deleting old product collection....")
       await productModel.deleteMany({});
       console.log("Inserting data into product collection...")
       await productModel.insertMany(productSeeds);
       console.log("data Inserted into product collection...")
        
    } catch (error) {
        console.log("error while inserting data")
        console.log(error);
        
    }
}

 importData();