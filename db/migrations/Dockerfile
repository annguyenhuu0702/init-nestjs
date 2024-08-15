FROM flyway/flyway:9.8.1

# COPY *.sql /flyway/sql/
COPY db/migrations /flyway/sql/

ENTRYPOINT ["flyway"]

CMD ["-?"]
