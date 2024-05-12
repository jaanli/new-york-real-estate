{{ config(
    materialized = 'external',
    location = var('output_path') + '/' + this.name + '.parquet'
) }}

SELECT
    "DOCUMENT ID" :: VARCHAR AS document_id,
    "RECORD TYPE" :: VARCHAR AS record_type,
    "PARTY TYPE" :: INTEGER AS party_type,
    "NAME" :: VARCHAR AS NAME,
    "ADDRESS 1" :: VARCHAR AS address_1,
    "ADDRESS 2" :: VARCHAR AS address_2,
    "COUNTRY" :: VARCHAR AS country,
    "CITY" :: VARCHAR AS city,
    "STATE" :: VARCHAR AS state,
    "ZIP" :: VARCHAR AS zip,
    "GOOD THROUGH DATE" :: TIMESTAMP AS good_through_date
FROM
    read_csv_auto(
        '~/data/rows.csv',
        header = TRUE,
        sep = ','
    )
