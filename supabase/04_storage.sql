-- 냉장고를 부탁해 · 사진 저장소 (레시피 대표 사진, 단계 사진, 후기 사진)
-- 사진 주소는 누구나 볼 수 있고, 올리기·지우기는 로그인한 사람이 자기 폴더(사용자 ID)에만 가능

insert into storage.buckets (id, name, public) values ('recipe-photos', 'recipe-photos', true)
on conflict (id) do nothing;

create policy "photo read" on storage.objects for select using (bucket_id = 'recipe-photos');
create policy "photo upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'recipe-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "photo delete own folder" on storage.objects for delete to authenticated
  using (bucket_id = 'recipe-photos' and (storage.foldername(name))[1] = auth.uid()::text);
