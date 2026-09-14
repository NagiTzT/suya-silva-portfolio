create extension if not exists pg_cron with schema extensions;

do $$
declare
  existing_job_id bigint;
begin
  for existing_job_id in
    select jobid from cron.job where jobname = 'portfolio-readonly-heartbeat'
  loop
    perform cron.unschedule(existing_job_id);
  end loop;
end
$$;

-- A consulta não altera tabelas nem dados da aplicação. O pg_cron mantém apenas
-- seus próprios metadados e histórico operacional de execução.
select cron.schedule(
  'portfolio-readonly-heartbeat',
  '*/10 * * * *',
  'select 1;'
);
