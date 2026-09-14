# Suyá Silva — Portfólio

Portfólio editorial em página única, desenvolvido com React, TypeScript, Vite e Framer Motion. As artes do PDF original foram otimizadas em WebP. Sem configuração externa, o site usa os dados locais; com Supabase, passa a carregar projetos e imagens do banco e do Storage.

## Rodar localmente

```powershell
pnpm install
pnpm dev
```

Abra o endereço mostrado pelo Vite. No Windows, também é possível dar dois cliques em `abrir-site.cmd`; mantenha a janela aberta e use `Ctrl+C` para encerrar.

## Configurar o Supabase com o robô

### O que o robô faz

- autentica o Supabase CLI e vincula este diretório ao projeto;
- valida e envia as migrations de `supabase/migrations`;
- cria as tabelas, índices, permissões públicas somente de leitura e políticas RLS;
- habilita o Supabase Cron e agenda um `SELECT 1` a cada 10 minutos;
- cria/atualiza `.env.local` com URL e chave pública;
- opcionalmente cria o bucket público `portfolio`, envia as 31 artes e cadastra os sete projetos.

A chave Secret é solicitada apenas durante a carga inicial, fica na memória do processo e não é gravada em arquivo. Nunca coloque essa chave em variável iniciada por `VITE_`.

### Passo a passo

1. No Dashboard do Supabase, abra o projeto e copie o **Project ref** exibido na URL/endereço do projeto. Ele tem 20 caracteres.
2. Em **Connect** ou **Settings > API Keys**, localize a chave **Publishable** (`sb_publishable_...`).
3. Em **Settings > API Keys**, crie ou copie uma chave **Secret** (`sb_secret_...`) apenas para a carga administrativa.
4. Abra o PowerShell nesta pasta. Se a execução de scripts estiver bloqueada, libere somente nesta janela:

   ```powershell
   Set-ExecutionPolicy -Scope Process Bypass
   ```

5. Faça primeiro uma validação sem alterar o projeto remoto:

   ```powershell
   .\scripts\configurar-supabase.ps1 -ProjectRef "SEU_PROJECT_REF"
   ```

6. Se a validação estiver correta, aplique tudo e envie o conteúdo:

   ```powershell
   .\scripts\configurar-supabase.ps1 -ProjectRef "SEU_PROJECT_REF" -Apply -Seed -SkipLogin
   ```

7. Quando solicitado, informe a senha do banco, a chave Publishable e depois a chave Secret. O arquivo `.env.local` será criado automaticamente e está ignorado pelo Git.
8. Rode `pnpm dev` e confirme no navegador que os sete projetos carregam. Se o Supabase estiver indisponível, o site usa os dados locais como fallback.

Se preferir configurar manualmente, execute as duas migrations no **SQL Editor** na ordem dos nomes e depois rode `pnpm supabase:seed` com `SUPABASE_URL` e `SUPABASE_SECRET_KEY` definidos apenas na sessão atual do terminal.

## Heartbeat de 10 minutos

A migration `202609140002_readonly_heartbeat.sql` agenda o job `portfolio-readonly-heartbeat` com a expressão `*/10 * * * *`. Cada execução faz somente:

```sql
select 1;
```

Nenhuma tabela ou registro do portfólio é alterado. O `pg_cron` mantém seus próprios metadados e histórico operacional. Esse job serve como verificação técnica leve; não é uma garantia contra pausa do projeto nem substitui um plano adequado do provedor.

Para conferir: **Supabase Dashboard > Integrations > Cron**. Para remover depois:

```sql
select cron.unschedule('portfolio-readonly-heartbeat');
```

## Build de produção

```powershell
pnpm lint
pnpm build
pnpm preview
```

O resultado é gerado em `dist/`.

## Subir para o Render

O `render.yaml` já descreve um Static Site, o build com pnpm, a pasta `dist`, o rewrite da SPA e o cache dos assets.

1. Envie este projeto para um repositório GitHub.
2. Entre em [dashboard.render.com](https://dashboard.render.com/) e conecte sua conta GitHub, se necessário.
3. Clique em **New > Blueprint**.
4. Selecione o repositório e mantenha a branch `main`.
5. O Render localizará automaticamente o `render.yaml` na raiz.
6. Preencha quando solicitado:
   - `VITE_SUPABASE_URL`: `https://SEU_PROJECT_REF.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: sua chave Publishable.
7. Confirme a criação do Blueprint e aguarde o build terminar.
8. Abra a URL `onrender.com`, teste o menu, os modais do portfólio e a visualização mobile.

Não cadastre a chave Secret no Render: este é um frontend público e precisa apenas da chave Publishable protegida pelas políticas RLS.

## Criar e publicar o repositório GitHub manualmente

Depois do commit local, crie no GitHub um repositório vazio chamado `suya-silva-portfolio`, preferencialmente privado até a revisão final. Não marque README, `.gitignore` ou licença, pois esses arquivos já existem localmente. Depois execute:

```powershell
git remote add origin https://github.com/SEU_USUARIO/suya-silva-portfolio.git
git push -u origin main
```

