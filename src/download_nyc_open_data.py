from playwright.sync_api import Playwright, sync_playwright, expect, TimeoutError
from pathlib import Path
from beartype import beartype
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


@beartype
def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to https://data.cityofnewyork.us/City-Government/ACRIS-Real-Property-Parties/636b-3b5g/about_data
    logging.info("Navigating to the ACRIS Real Property Parties page...")
    page.goto(
        "https://data.cityofnewyork.us/City-Government/ACRIS-Real-Property-Parties/636b-3b5g/about_data"
    )

    max_retries = 3
    retry_delay = 60  # seconds

    for retry in range(max_retries):
        try:
            logging.info(f"Downloading file (attempt {retry + 1})...")

            # Click the export button
            logging.info("Clicking the export button...")
            page.wait_for_selector(
                "button.forge-button.forge-button--outlined", timeout=60000
            )
            logging.info("Export button found. Clicking...")
            page.locator("button.forge-button.forge-button--outlined").click(
                timeout=60000
            )

            with page.expect_download(timeout=600000) as download_info:
                logging.info("Clicking the download button...")
                page.wait_for_selector(
                    'button[data-testid="export-download-button"]', timeout=60000
                )
                logging.info("Download button found. Clicking...")
                page.locator('button[data-testid="export-download-button"]').click(
                    timeout=120000
                )
            download = download_info.value
            logging.info("File downloaded successfully.")
            break  # Exit the loop if the download is successful
        except TimeoutError as e:
            logging.error(
                f"Timeout exceeded while waiting for download (attempt {retry + 1}): {e}"
            )
            if retry < max_retries - 1:
                logging.info(f"Retrying in {retry_delay} seconds...")
                page.wait_for_timeout(retry_delay * 1000)
            else:
                logging.error("Max retries reached. Aborting download.")
                raise e

    script_dir = Path(__file__).resolve().parent
    file_path = script_dir / download.suggested_filename
    logging.info(f"Saving file to {file_path}...")
    download.save_as(file_path)
    logging.info("File saved successfully.")

    # Verify the downloaded file
    if file_path.exists() and file_path.stat().st_size > 0:
        logging.info(f"File '{file_path}' downloaded successfully.")
    else:
        logging.error(f"Failed to download the file or the file is empty.")

    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
