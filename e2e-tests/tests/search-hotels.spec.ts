import {test,expect} from "@playwright/test";

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

test("should show hotel search results",async({page})=>{
    await page.goto(UI_URL);
    
    await page.getByPlaceholder("where are you going?").fill("Test City");
    await page.getByRole("button",{name:"Search"}).click();

    await expect(page.getByText("Hotels Found in Test City")).toBeVisible();
    await expect(page.getByText("Test Hotel").first()).toBeVisible();
});
