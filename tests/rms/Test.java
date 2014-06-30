import javax.microedition.rms.*;

public class Test extends TestMidlet {
	public void startApp() {
		try {
			try {
				RecordStore.openRecordStore("test", false);
				check(false);
			} catch (RecordStoreNotFoundException e) {
				check(true);
			}
		
			RecordStore store = RecordStore.openRecordStore("test", true);
			byte[] data = new byte[] {1, 11, 17, -120, -50};
			int id = store.addRecord(data, 1, 3);
			compare(id, 1);
			id = store.addRecord(data, 0, 5);
			compare(id, 2);
			id = store.addRecord(data, 4, 1);
			compare(id, 3);
			data = store.getRecord(3);
			compare(data.length, 1);
			compare(data[0], -50);
			compare(store.getNumRecords(), 3);
			store.closeRecordStore();
			RecordStore.deleteRecordStore("test");
		} catch (Exception e) {
			check(false);
		}
		finish();
	}
}
