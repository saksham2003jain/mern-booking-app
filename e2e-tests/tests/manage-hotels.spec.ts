import {test,expect} from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";


test.beforeEach(async ({page})=>{
    await page.goto(UI_URL);

  //get the signin button
  await page.getByRole("link",{name:"Sign In"}).click();

  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText("Sign in Succesfull")).toBeVisible();
});

test("should allow user to add hotel",async ({page})=>{
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description");
    await page.locator('[name="pricePerNight"]').fill("1000");
    await page.selectOption('[name="starRating"]',"3");
    await page.getByText("Inn").click();
    await page.getByText("Free Wifi").click();
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("2");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
    ]);

    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved")).toBeVisible({timeout:10000});
});


test("should display hotels",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Test Hotel").first()).toBeVisible();
    await expect(page.getByText("Test Description").first()).toBeVisible();
    await expect(page.getByText("Test City,Test Country").first()).toBeVisible();
    await expect(page.getByText("Inn").first()).toBeVisible();
    await expect(page.getByText("$1000 per Night").first()).toBeVisible();
    await expect(page.getByText("2 adults ,2 children").first()).toBeVisible();
    await expect(page.getByText("3 Star Rating").first()).toBeVisible();

    await expect(page.getByRole("link",{name:"View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link",{name:"Add Hotel"}).first()).toBeVisible();
});

test("should edit hotel",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link",{name:"View Details"}).first().click();

    await page.waitForSelector('[name="name"]',{state:"attached"});

    

    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel');
    await page.locator('[name="name"]').fill("Dublin Getaways");
    await page.getByRole("button",{name:"Save"}).click();

    await expect(page.getByText("Hotel Saved")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue('Dublin Getaways');
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.getByRole("button",{name:"Save"}).click();

    await expect(page.getByText("Hotel Saved")).toBeVisible();
})
 