CREATE TABLE "VaccinationMetaData" (
    "PRODUCT_NAME" varchar   NOT NULL,
    "Company_name" varchar   NOT NULL,
    CONSTRAINT "pk_VaccinationMetaData" PRIMARY KEY (
        "PRODUCT_NAME"
     )
);

CREATE TABLE "VaccinationData" (
    "COUNTRY" varchar   NOT NULL,
    "ISO3" varchar   NOT NULL,
    "WHO_REGION" varchar   NOT NULL,
    "DATA_SOURCE" varchar   NOT NULL,
    "DATE_UPDATED" date   NOT NULL,
    "TOTAL_VACCINATIONS" integer   NOT NULL,
    "PERSONS_VACCINATED_1PLUS_DOSE" integer   NOT NULL,
    "TOTAL_VACCINATIONS_PER100" integer   NOT NULL,
    "PERSONS_VACCINATED_1PLUS_DOSE_PER100" decimal   NOT NULL,
    "PERSONS_LAST_DOSE" integer   NOT NULL,
    "PERSONS_LAST_DOSE_PER100" integer   NOT NULL,
    "FIRST_VACCINE_DATE" date   NOT NULL,
    "NUMBER_VACCINES_TYPES_USED" integer   NOT NULL,
    "PERSONS_BOOSTER_ADD_DOSE" integer   NOT NULL,
    "PERSONS_BOOSTER_ADD_DOSE_PER100" decimal   NOT NULL,
    CONSTRAINT "pk_VaccinationData" PRIMARY KEY (
        "COUNTRY"
     )
);

CREATE TABLE "DailyCasesDeath" (
    "Date_reported" date   NOT NULL,
    "Country_code" varchar   NOT NULL,
    "Country" varchar   NOT NULL,
    "WHO_region" varchar   NOT NULL,
    "New_cases" integer   NOT NULL,
    "Cumulative_cases" integer   NOT NULL,
    "New_deaths" integer   NOT NULL,
    "Cumulative_deaths" integer   NOT NULL,
    CONSTRAINT "pk_DailyCasesDeath" PRIMARY KEY (
        "Date_reported"
     )
);

ALTER TABLE "DailyCasesDeath" ADD CONSTRAINT "fk_DailyCasesDeath_Country" FOREIGN KEY("Country")
REFERENCES "VaccinationData" ("COUNTRY");
