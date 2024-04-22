{{ config(materialized='external', location=var('output_path') + '/' + this.name + '.parquet') }}

SELECT * FROM read_csv_auto('~/Downloads/ACRIS_-_Real_Property_Master_20240422.csv',
                            types={'DOC. DATE': 'VARCHAR'},
                            dateformat='%m/%d/%Y')