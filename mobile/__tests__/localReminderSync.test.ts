/**
 * "Seriyi yaptım ama hatırlatma geldi" (2026-10-06): uzak bildirimi olmayan
 * cihazda yerel günlük + seri hatırlatması, bugün çalışıldıysa ilk kez YARIN çalar.
 */
import notifee from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncLocalReminders, __resetReminderSync } from "../src/lib/notifications";

const create = notifee.createTriggerNotification as unknown as jest.Mock;

function firstFire(id: string): Date {
  const call = create.mock.calls.find((c) => c[0].id === id);
  if (!call) throw new Error(`${id} kurulmadı`);
  return new Date(call[1].timestamp);
}

const isTomorrow = (d: Date) => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return d.toDateString() === t.toDateString();
};

beforeEach(async () => {
  create.mockClear();
  __resetReminderSync();
  await AsyncStorage.setItem("lernomi:reminder", "23:59");
  await AsyncStorage.setItem("lernomi:notif:streak", "1");
});

test("bugün çalışıldıysa günlük ve seri hatırlatması yarından başlar", async () => {
  await syncLocalReminders(true);
  expect(isTomorrow(firstFire("lernomi-daily"))).toBe(true);
  expect(firstFire("lernomi-daily").getHours()).toBe(23);
  expect(isTomorrow(firstFire("lernomi-streak"))).toBe(true);
  expect(firstFire("lernomi-streak").getHours()).toBe(20);
});

test("çalışılmadıysa günlük hatırlatma bugünkü saatinde kalır", async () => {
  await syncLocalReminders(false);
  const d = firstFire("lernomi-daily");
  /* 23:59 daha geçmediyse bugün; test tam o dakikada koşarsa yarın. */
  expect(d.toDateString() === new Date().toDateString() || isTomorrow(d)).toBe(true);
  expect(d.getMinutes()).toBe(59);
});

test("aynı gün aynı durum ikinci kez yeniden kurmuyor", async () => {
  await syncLocalReminders(true);
  const n = create.mock.calls.length;
  await syncLocalReminders(true);
  expect(create.mock.calls.length).toBe(n);
});

test("kapalı hatırlatma kurulmuyor", async () => {
  await AsyncStorage.setItem("lernomi:reminder", "");
  await AsyncStorage.setItem("lernomi:notif:streak", "");
  await syncLocalReminders(true);
  expect(create).not.toHaveBeenCalled();
});
